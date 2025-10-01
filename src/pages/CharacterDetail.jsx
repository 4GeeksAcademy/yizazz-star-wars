import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import imagen from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const CharacterDetail = () => {
    const { theId } = useParams();  
    const navigate = useNavigate();
    const [character, setCharacter] = useState(null);
    const { store, dispatch } = useGlobalReducer();

    const toggleFavourite = () => {
        if (!character) return;
        const exists = store.favourites.find(fav => fav.uid === character.uid);
        if (exists) {
            dispatch({ type: "remove_from_favourites", payload: character });
        } else {
            dispatch({ type: "add_to_favourites", payload: { ...character, type: "character" } });
        }
    };

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const response = await fetch(`https://www.swapi.tech/api/people/${theId}`);
                const data = await response.json();
                const props = data.result.properties;
                setCharacter({
                    uid: theId,
                    name: props.name,
                    gender: props.gender,
                    hair_color: props.hair_color,
                    eye_color: props.eye_color,
                    height: props.height,
                    mass: props.mass,
                    birth_year: props.birth_year
                });
            } catch (error) {
                console.log("Error fetching character details:", error);
            }
        };

        fetchCharacter();
    }, [theId]);

    if (!character) return <div className="text-center mt-5">Loading character...</div>;

    const isFavourite = store.favourites.some(fav => fav.uid === character.uid);

    return (
        <div className="container mt-4">
            <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>⬅ Back</button>
            <div className="row">
                <div className="col-md-6">
                    <img src={imagen} alt={character.name} className="img-fluid rounded" />
                </div>
                <div className="col-md-6">
                    <h2>{character.name}</h2>
                    <p><strong>Gender:</strong> {character.gender}</p>
                    <p><strong>Hair Color:</strong> {character.hair_color}</p>
                    <p><strong>Eye Color:</strong> {character.eye_color}</p>
                    <p><strong>Height:</strong> {character.height}</p>
                    <p><strong>Mass:</strong> {character.mass}</p>
                    <p><strong>Birth Year:</strong> {character.birth_year}</p>
                    <button
                        className={`btn ${isFavourite ? "btn-danger" : "btn-outline-danger"}`}
                        onClick={toggleFavourite}
                    >
                        {isFavourite ? "Remove from Favourites ❤️" : "Add to Favourites 🤍"}
                    </button>
                </div>
            </div>
        </div>
    );
};
