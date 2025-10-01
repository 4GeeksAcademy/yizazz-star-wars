import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import imagen from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const CharacterCard = ({ character }) => {
  const [details, setDetails] = useState(null);
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const toggleFavourite = () => {
    if (!character.uid) return;
    const exists = store.favourites.find(fav => fav.uid === character.uid);
    if (exists) {
      dispatch({ type: "remove_from_favourites", payload: character });
    } else {
      dispatch({ type: "add_to_favourites", payload: { ...character, type: "character" } });
    }
  };

  useEffect(() => {
    if (!character.url) return;
    const fetchDetails = async () => {
      try {
        const response = await fetch(character.url);
        if (!response.ok) return;
        const data = await response.json();
        const props = data.result.properties;
        setDetails({
          gender: props.gender,
          hair_color: props.hair_color,
          eye_color: props.eye_color
        });
      } catch (error) {
        console.log("Error fetching character details:", error);
      }
    };
    fetchDetails();
  }, [character.url]);

  const isFavourite = store.favourites.some(fav => fav.uid === character.uid);

  return (
    <div className="card p-0 m-2" style={{ minWidth: "250px" }}>
      <img src={imagen} className="card-img-top" alt={character.name} />
      <div className="card-body">
        <h5 className="card-title">{character.name}</h5>
        {details && (
          <>
            <p className="m-0">Gender: {details.gender}</p>
            <p className="m-0">Hair Color: {details.hair_color}</p>
            <p className="m-0">Eye Color: {details.eye_color}</p>
          </>
        )}
        <div className="d-flex justify-content-between mt-2">
          <button 
            className="btn btn-primary"
            onClick={() => navigate(`/character/${character.uid}`)}
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
