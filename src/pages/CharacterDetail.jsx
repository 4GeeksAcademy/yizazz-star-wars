import { useParams } from "react-router-dom"
import imagen from "../assets/img/rigo-baby.jpg"
import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const CharacterDetail = () => {

    const { uid } = useParams();
    const { store, dispatch } = useGlobalReducer();
    const [character, setCharacters] = useState(null);

    useEffect(() => {


        if (store.character && store.character[uid]) {
            setCharacters(store.character[uid]);
        } else {
            const Details = async () => {
                try {
                    const response = await fetch(`https://www.swapi.tech/api/people/${uid}`);
                    if (!response.ok) throw new Error("Error en el fetch");
                    const data = await response.json();
                    console.log("respuesta de la api", data)

                    const characterData = data.result.properties;
                    setCharacters(characterData);

                    dispatch({ type: "add_character", payload: { uid, data: characterData } });

                    const cached = JSON.parse(localStorage.getItem(`characters`) || `{}`);
                    localStorage.setItem(`characters`, JSON.stringify({ ...cached, [uid]: characterData }));
                } catch (error) {
                    console.error("Error al obtener detalles", error);
                }
            };
            Details();
        }
    }, [uid]);


    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="row mt-4">
                        <div className="col-6">
                            <img src={imagen} alt="imagen baby" />
                        </div>
                        <div className="col-6">
                            <div className="d-flex h1 justify-content-center">
                                {character && character.name}
                            </div>
                            <div className="d-flex text-center justify-content-center">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem dolores maxime atque architecto nulla qui totam tempore at. Commodi culpa facilis iure ipsam quidem aliquid aliquam incidunt nobis odit voluptates?
                            </div>
                        </div>
                        <div className="col-12 border-top border-danger mt-4 pt-4">
                            <div className="row">
                                <div className="col-2 text-danger fw-bold">Name
                                    <div>
                                        {character && character.name}
                                    </div>
                                </div>
                                <div className="col-2 text-danger fw-bold">Birth Year
                                    <div>
                                        {character && character.birth_year}
                                    </div>
                                </div>
                                <div className="col-2 text-danger fw-bold">Gender
                                    <div>
                                        {character && character.gender}
                                    </div>
                                </div>
                                <div className="col-2 text-danger fw-bold">Height
                                    <div>
                                        {character && character.height}
                                    </div>
                                </div>
                                <div className="col-2 text-danger fw-bold">Skin Color
                                    <div>
                                        {character && character.skin_color}
                                    </div>
                                </div>
                                <div className="col-2 text-danger fw-bold">Eye Color
                                    <div>
                                        {character && character.eye_color}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}