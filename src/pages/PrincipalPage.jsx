import { CharacterList } from "../components/CharactersList";
import { PlanetList } from "../components/PlanetList"; // 🔹 importa PlanetList

export const PrincipalPage = () => {
    return (
        <div>
            <div className="container h1 pt-4 pb-4 text-danger">
                Characters
            </div>
            <CharacterList />

            <div className="container h1 text-danger pt-5">
                Planets
            </div>
            <PlanetList />  {/* 🔹 reemplaza el carrusel fijo */}
        </div>
    );
};
