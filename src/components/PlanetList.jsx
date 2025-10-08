import { useEffect } from "react";
import { PlanetsCard } from "./PlanetsCard";
import { Carousel } from "./Carousel";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const PlanetList = () => {
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        const getPlanets = async () => {
            if (Object.keys(store.planets).length === 0) {
                try {
                    const response = await fetch("https://www.swapi.tech/api/planets");
                    const data = await response.json();
                    const planetsObj = {};
                    data.results.forEach(p => planetsObj[p.uid] = p);
                    dispatch({ type: "load_planet", payload: planetsObj });
                } catch (error) {
                    console.log(error);
                }
            }
        };
        getPlanets();
    }, []);

    return (
        <Carousel>
            {Object.values(store.planets).map((planet, index) => (
                <PlanetsCard key={index} planet={planet} />
            ))}
        </Carousel>
    );
};
