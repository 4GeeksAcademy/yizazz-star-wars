import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const PlanetDetail = () => {
    const { theId } = useParams();  
    const navigate = useNavigate();
    const [planet, setPlanet] = useState(null);
    const { store, dispatch } = useGlobalReducer();

    const toggleFavourite = () => {
        if (!planet) return;
        const exists = store.favourites.find(fav => fav.uid === planet.uid);
        if (exists) {
            dispatch({ type: "remove_from_favourites", payload: planet });
        } else {
            dispatch({ type: "add_to_favourites", payload: { ...planet, type: "planet" } });
        }
    };

    useEffect(() => {
        const fetchPlanet = async () => {
            try {
                const response = await fetch(`https://www.swapi.tech/api/planets/${theId}`);
                const data = await response.json();
                const props = data.result.properties;
                setPlanet({
                    uid: theId,
                    name: props.name,
                    population: props.population,
                    terrain: props.terrain,
                    climate: props.climate,
                    gravity: props.gravity,
                    diameter: props.diameter
                });
            } catch (error) {
                console.log("Error fetching planet details:", error);
            }
        };

        fetchPlanet();
    }, [theId]);

    if (!planet) return <div className="text-center mt-5">Loading planet...</div>;

    const isFavourite = store.favourites.some(fav => fav.uid === planet.uid);

    return (
        <div className="container mt-4">
            <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>⬅ Back</button>
            <div className="row">
                <div className="col-md-6">
                    <img src={planetImg} alt={planet.name} className="img-fluid rounded" />
                </div>
                <div className="col-md-6">
                    <h2>{planet.name}</h2>
                    <p><strong>Population:</strong> {planet.population}</p>
                    <p><strong>Terrain:</strong> {planet.terrain}</p>
                    <p><strong>Climate:</strong> {planet.climate}</p>
                    <p><strong>Gravity:</strong> {planet.gravity}</p>
                    <p><strong>Diameter:</strong> {planet.diameter}</p>
                    <button
                        className={`btn ${isFavourite ? "btn-danger" : "btn-outline-danger"}`}
                        onClick={toggleFavourite}
                    >
                        {isFavourite ? `Remove from Favourites <i class="fa-regular fa-heart"></i>`  : `Add to Favourites <i class="fa-solid fa-heart"></i>` }
                    </button>
                </div>
            </div>
        </div>
    );
};
