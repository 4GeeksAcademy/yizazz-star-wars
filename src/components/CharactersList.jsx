import { CharacterCard } from "./CharacterCard";
import { Carousel } from "./Carousel";
import { useState, useEffect } from "react";

export const CharacterList = () => {
    const [characters, setCharacters] = useState([]);

    const GetCharacters = async () => {
        try {
            const response = await fetch("https://www.swapi.tech/api/people");
            const data = await response.json();
            setCharacters(data.results);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        GetCharacters();
    }, []);

    return (
        <Carousel>
            {characters.map((char, index) => (
                <CharacterCard key={index} character={char} />
            ))}
        </Carousel>
    );
};
