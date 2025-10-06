import { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";


export const PlanetsCard = ({ planet }) => {
    const [details, setDetails] = useState({
        population: "",
        terrain: ""
    });


    const { store, dispatch } = useGlobalReducer();



    const toggleFavourite = () => {
        const exists = store.favourites.find(fav => fav.uid === planet.uid);
        if (exists) {
            dispatch({ type: "remove_from_favourites", payload: planet });
        } else {
            dispatch({ type: "add_to_favourites", payload: { ...planet, type: "planet" } });
        }
    };

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(planet.url);
                const data = await response.json();
                const props = data.result.properties;
                setDetails({
                    population: props.population,
                    terrain: props.terrain
                });
            } catch (error) {
                console.log(error);
            }
        };

        fetchDetails();
    }, [planet.url]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="card p-0">
                        <img src="" className="card-img-top" alt={planet.name} />
                        <div className="card-body">
                            <h5 className="card-title">{planet.name}</h5>
                            <p className="gender m-0">Population: {details.population}</p>
                            <p className="hair-color m-0">Terrain: {details.terrain}</p>
                            <div className="d-flex justify-content-between">
                                <a href="#" className="btn btn-primary mt-3">Learn More!</a>
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
