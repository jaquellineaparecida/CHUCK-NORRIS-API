// Nome: Jaquelline Aparecida C. B. De Sousa
// RM: 99553

import { useEffect, useState } from "react";
import "./style.css";

function App() {
  const [jokes, setJokes] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [favoriteJokes, setFavoriteJokes] = useState<string[]>([]);

  useEffect(() => {
    favoriteJoke();
    newJoke();
  }, []);

  useEffect(() => {
    newJoke();
  }, {});

  const newJoke = () => {
    fetchJoke();
  };

  const handleClick = () => {
    setFavorite(!favorite);
    if (!favorite) {
      setFavoriteJokes([...favoriteJokes, jokes]);
    }
  };

  const removeFavorite = (index) => {
    const confirm = window.confirm("Deseja remover dos favoritos?");
    if (confirm) {
      const updatedFavorites = [...favoriteJokes];
      updatedFavorites.splice(index, 1);
      setFavoriteJokes(updatedFavorites);
      localStorage.setItem("favoriteJokes", JSON.stringify(updatedFavorites));
    }
  };

  const favoriteJoke = () => {
    const storedFavoriteJokes = localStorage.getItem("favoriteJokes");
    if (storedFavoriteJokes) {
      setFavoriteJokes(JSON.parse(storedFavoriteJokes));
    }
  };

  useEffect(() => {
    localStorage.setItem("favoriteJokes", JSON.stringify(favoriteJokes));
  }, [favoriteJokes]);

  const fetchJoke = () => {
    fetch("https://api.chucknorris.io/jokes/random")
      .then((response) => response.json())
      .then((data) => setJokes(data.value))
      .catch((error) => console.error(error));
  };

  return (
    <div className="container">
      <div className="img">
        <img className="aprovado" src="src/assets/aprovado.jpg" />
      </div>

      <h1 className="tittle"> CHUCK NORRIS JOKES</h1>

      <div className="sla">
        <p className="piadas"> {jokes} </p>

        <button className="btn-heart" onClick={handleClick}>
          <img
            src={
              favorite
                ? "src/assets/heart_filled.svg"
                : "src/assets/heart_empty.svg"
            }
            alt={favorite ? "Desfavoritar" : "Favoritar"}
          />
        </button>
      </div>

      <button className="joke-btn" onClick={newJoke}>
        {" "}
        Nova Piada{" "}
      </button>

      <div>
        <h2 className="tlt-fav">Favoritos:</h2>
        <ul>
          {favoriteJokes.map((joke, index) => (
            <li key={index}>
              {joke}
              <button
                className="remove-btn"
                onClick={() => removeFavorite(index)}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
