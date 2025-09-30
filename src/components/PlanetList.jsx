import { useState, useEffect } from "react";
import { PlanetsCard } from "./PlanetsCard";
import { Carousel } from "./Carousel";

export const PlanetList = () => {
    const [planets, setPlanets] = useState([]);

    const getPlanets = async () => {
        try {
            const response = await fetch("https://www.swapi.tech/api/planets");
            const data = await response.json();
            setPlanets(data.results);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPlanets();
    }, []);

    return (
        <Carousel>
            {planets.map((planet, index) => (
                <PlanetsCard key={index} planet={planet} />
            ))}
        </Carousel>
    );
};
