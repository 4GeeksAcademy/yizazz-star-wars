import { CharacterCard } from "./CharacterCard";
import { Carousel } from "./Carousel";
import { useState } from "react";

export const CharacterList =()=>{
    const [characters, setCharacters] = useState([]);
    
    const GetCharacters = async()=>{
        try {
            const response = await fetch("https://www.swapi.tech/api/people");
            const data = await response.json();
            const results = data.results;
        } catch (error) {
            
        }
    }
}