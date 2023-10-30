import "./App.css";
import { fetchPokemon, fetchPokemonData } from "./API/fetchPokemon";
import { useEffect, useState } from "react";

function App() {
  const pokemonPerPage = 5;
  const [pokemons, setPokemons] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState(
    pokemons.slice(0, pokemonPerPage)
  );
  const [singlePokemon, setSinglePokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getAllPokemon = async () => {
      const pokemons = await fetchPokemon();
      setPokemons(pokemons);
    };
    getAllPokemon();
  }, []);

  useEffect(() => {
    const updateCurrentPokemon = () => {
      const firstPokemonIdx = (currentPage - 1) * pokemonPerPage;
      const lastPokemonIdx = firstPokemonIdx + pokemonPerPage;
      const pokemonToFetch = pokemons.slice(firstPokemonIdx, lastPokemonIdx);
      setCurrentPokemon(pokemonToFetch);
    };

    updateCurrentPokemon();
  }, [currentPage, pokemons]);

  useEffect(() => {
    const fetchDataForPokemon = async (url, index) => {
      const data = await fetchPokemonData(url);
      setSinglePokemon((pokemonArray) => {
        const newPokemonArray = [...pokemonArray];
        newPokemonArray[index] = data;
        return newPokemonArray;
      });
    };

    currentPokemon.forEach((pokemon, index) => {
      console.log("thats 1");
      fetchDataForPokemon(pokemon.url, index);
    });
  }, [currentPokemon]);

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPokemonCount = pokemons.length;
  const totalPageCount = totalPokemonCount / pokemonPerPage;

  const generatePaginationNumbers = () => {
    const paginationNumbers = [];
    for (let i = 1; i <= totalPageCount; i++) {
      paginationNumbers.push(
        <div
          key={i}
          className={currentPage === i ? "active" : "nonActive"}
          onClick={() => pagination(i)}
        >
          {i}
        </div>
      );
    }
    return paginationNumbers;
  };

  return (
    <div className="App">
      {singlePokemon.map((singlePokemon, index) => (
        <div key={singlePokemon.name}>
          <h1>{singlePokemon.name}</h1>
          <img
            alt={singlePokemon.name}
            src={singlePokemon.sprites.back_default}
          ></img>
          <div>Weight {singlePokemon.weight}</div>
          <div>Height {singlePokemon.height}</div>
        </div>
      ))}
      <div className="pagination">
        <button
          className="backPagination"
          onClick={() => {
            if (currentPage > 1) {
              pagination(currentPage - 1);
            }
          }}
        >
          &lt;&lt;&lt;
        </button>
        {generatePaginationNumbers()}
        <button
          className="forwardPagination"
          onClick={() => {
            if (currentPage < 4) {
              pagination(currentPage + 1);
            }
          }}
        >
          &gt;&gt;&gt;
        </button>
      </div>
    </div>
  );
}

export default App;
