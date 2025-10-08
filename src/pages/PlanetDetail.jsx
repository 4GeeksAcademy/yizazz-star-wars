import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import imagen from "../assets/img/rigo-baby.jpg";

export const PlanetDetail = () => {
    const { uid } = useParams();
    const { store, dispatch } = useGlobalReducer();
    const [planet, setPlanet] = useState(null);

    useEffect(() => {
        if (store.planets && store.planets[uid]?.data) {
            setPlanet(store.planets[uid].data);
        } else {
            const fetchPlanet = async () => {
                try {
                    const response = await fetch(`https://swapi.tech/api/planets/${uid}`);
                    if (!response.ok) throw new Error("Error en el fetch");
                    const data = await response.json();

                    const planetData = data.result;
                    setPlanet(planetData);

                    dispatch({ type: "add_planet", payload: { uid, data: planetData } });

                    const cached = JSON.parse(localStorage.getItem("planets") || "{}");
                    localStorage.setItem("planets", JSON.stringify({ ...cached, [uid]: planetData }));
                } catch (error) {
                    console.error("Error al obtener detalles del planeta", error);
                }
            };
            fetchPlanet();
        }
    }, [uid]);

    if (!planet) return <p className="text-center mt-5">Loading planet details...</p>;

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="row mt-4">
                        <div className="col-6">
                            <img src={imagen} alt={planet.properties.name} />
                        </div>
                        <div className="col-6">
                            <div className="d-flex h1 justify-content-center">
                                {planet.properties.name}
                            </div>
                            <div className="d-flex text-center justify-content-center">
                               Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, suscipit ullam? Vitae architecto omnis sint quod, voluptate earum et laborum tempore exercitationem in veritatis possimus atque amet odit rerum iusto.
                            </div>
                        </div>
                        <div className="col-12 border-top border-danger mt-4 pt-4">
                            <div className="row">
                                <div className="col-2 text-danger fw-bold">Name
                                    <div>{planet.properties.name}</div>
                                </div>
                                <div className="col-2 text-danger fw-bold">Climate
                                    <div>{planet.properties.climate}</div>
                                </div>
                                <div className="col-2 text-danger fw-bold">Population
                                    <div>{planet.properties.population}</div>
                                </div>
                                <div className="col-2 text-danger fw-bold">Orbital Period
                                    <div>{planet.properties.orbital_period}</div>
                                </div>
                                <div className="col-2 text-danger fw-bold">Rotation Period
                                    <div>{planet.properties.rotation_period}</div>
                                </div>
                                <div className="col-2 text-danger fw-bold">Diameter
                                    <div>{planet.properties.diameter}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
