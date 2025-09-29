import { CharacterCard } from "../components/CharacterCard"
import { Carousel } from "../components/Carousel"
import { PlanetsCard } from "../components/PlanetsCard"

export const PrincipalPage = () => {
    return (<div>
        <div className="container h1 pt-4 pb-4 text-danger">
            Characters
        </div>
        <Carousel>
        <CharacterCard />
        </Carousel>
        <div className="container h1 text-danger pt-5">
            Planets
        </div>
        <Carousel>
        <PlanetsCard />
        </Carousel>
    </div>
    )
}