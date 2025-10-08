import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import imagen from "../assets/img/rigo-baby.jpg"

export const PlanetsCard = ({ planet }) => {
    const [details, setDetails] = useState(null);
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
            if (store.planets[planet.uid]?.data) {
                setDetails(store.planets[planet.uid].data.properties);
                return;
            }
            try {
                const response = await fetch(planet.url);
                const data = await response.json();
                dispatch({ type: "add_planet", payload: { uid: planet.uid, data: data.result } });
                setDetails(data.result.properties);
            } catch (error) {
                console.log(error);
            }
        };
        fetchDetails();
    }, [planet]);

    if (!details) return null;

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="card p-0">
                        <img src={imagen} className="card-img-top" alt={planet.name} />
                        <div className="card-body">
                            <h5 className="card-title">{planet.name}</h5>
                            <p className="gender m-0">Population: {details.population}</p>
                            <p className="hair-color m-0">Terrain: {details.terrain}</p>
                            <div className="d-flex justify-content-between">
                                <Link to={`/planet/${planet.uid}`} className="btn btn-primary mt-3">
                                    Learn More!
                                </Link>
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
