import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";


export const PlanetsCard = ({ planet }) => {
  const [details, setDetails] = useState(null);
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const toggleFavourite = () => {
    if (!planet.uid) return;
    const exists = store.favourites.find(fav => fav.uid === planet.uid);
    if (exists) {
      dispatch({ type: "remove_from_favourites", payload: planet });
    } else {
      dispatch({ type: "add_to_favourites", payload: { ...planet, type: "planet" } });
    }
  };

  useEffect(() => {
    if (!planet.url) return;
    const fetchDetails = async () => {
      try {
        const response = await fetch(planet.url);
        if (!response.ok) return; 
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

  const isFavourite = store.favourites.some(fav => fav.uid === planet.uid);

  return (
    <div className="card p-0 m-2" style={{ minWidth: "250px" }}>
      <img src="" className="card-img-top" alt={planet.name} />
      <div className="card-body">
        <h5 className="card-title">{planet.name}</h5>
        {details && (
          <>
            <p className="m-0">Population: {details.population}</p>
            <p className="m-0">Terrain: {details.terrain}</p>
          </>
        )}
        <div className="d-flex justify-content-between mt-2">
          <button 
            className="btn btn-primary"
            onClick={() => navigate(`/planet/${planet.uid}`)}
          >
            Learn More!
          </button>
          <button 
            className="btn btn-outline-danger"
            onClick={toggleFavourite}
          >
            <i className={isFavourite ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
          </button>
        </div>
      </div>
    </div>
  );
};
