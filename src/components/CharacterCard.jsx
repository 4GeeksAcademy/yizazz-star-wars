import { useState, useEffect } from "react";
import imagen from "../assets/img/rigo-baby.jpg";
import  useGlobalReducer  from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";


export const CharacterCard = ({ character }) => {
    const [details, setDetails] = useState({
        gender: "",
        hair_color: "",
        eye_color: ""
    });

    const { store, dispatch } = useGlobalReducer();


    const toggleFavourite = () => {
        const exists = store.favourites.find(fav => fav.uid === character.uid);
        if (exists) {
            dispatch({ type: "remove_from_favourites", payload: character });
        } else {
            dispatch({ type: "add_to_favourites", payload: { ...character, type: "character" } });
        }
    };

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(character.url);
                const data = await response.json();
                const props = data.result.properties;

                setDetails({
                    gender: props.gender,
                    hair_color: props.hair_color,
                    eye_color: props.eye_color
                });
            } catch (error) {
                console.log("Error fetching character details:", error);
            }
        };

        fetchDetails();
    }, [character.url]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="card p-0">
                        <img src={imagen} className="card-img-top" alt={character.name} />
                        <div className="card-body">
                            <h5 className="card-title">{character.name}</h5>
                            <p className="gender m-0">Gender: {details.gender}</p>
                            <p className="hair-color m-0">Hair Color: {details.hair_color}</p>
                            <div className="eye-color">Eye Color: {details.eye_color}</div>
                            <div className="d-flex justify-content-between">
                                <Link to={`/characterdetail/${character.uid}`} className="btn btn-primary mt-3">Learn More!</Link>
                                <a onClick={toggleFavourite} className="btn btn-secondary ml-2 mt-3 align-items-end">
                                    <i className="fa-solid fa-heart"></i>
                                </a>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
