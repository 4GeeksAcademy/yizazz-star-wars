import  useGlobalReducer  from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();

	const removeFavourite = (item) => {
		dispatch({ type: "remove_from_favourites", payload: item });
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Star Wars</span>
				</Link>

				<div className="dropdown">
					<button
						className="btn btn-primary dropdown-toggle"
						type="button"
						id="favouritesDropdown"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						Favoritos {store.favourites.length}
					</button>
					<ul className="dropdown-menu dropdown-menu-end" aria-labelledby="favouritesDropdown">
						{store.favourites.length === 0 && (
							<li className="dropdown-item text-muted">No hay favoritos</li>
						)}
						{store.favourites.map((item) => (
							<li
								key={item.uid}
								className="dropdown-item d-flex justify-content-between align-items-center"
							>
								<span>{item.name}</span>
								<button
									className="btn btn-sm"
									onClick={() => removeFavourite(item)}
								>
									<i className="fa-solid fa-trash-can"></i>
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>
		</nav>
	);
};
