import { useNavigate } from "react-router-dom";
import { fetchPokemon, fetchPokemonData } from "../API/fetchPokemon";
import { useEffect, useState } from "react";
import pokemonImg from "../Img/pokemon.png"

function Home() {
  const nav = useNavigate();
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
          className={
            currentPage === i
              ? "bg-red-500 w-50 border border-black p-2"
              : "w-50 border border-black p-2"
          }
          onClick={() => pagination(i)}
        >
          {i}
        </div>
      );
    }
    return paginationNumbers;
  };

  return (
    <div className="Home text-center">
      <img className="w-1/3 mx-auto" src={pokemonImg} alt="Pokemon" />
      {singlePokemon.map((singlePokemon, index) => (
        <div className="mt-10 bg-gray-200 w-1/4 mx-auto" key={singlePokemon.name}>
          <h1 className="text-3xl font-bold">{singlePokemon.name}</h1>
          <img
            alt={singlePokemon.name}
            src={singlePokemon.sprites.front_default}
            className="mx-auto"
          ></img>
          <div>Weight {singlePokemon.weight}</div>
          <div>Height {singlePokemon.height}</div>
          <button
            onClick={() => {
              nav(`/${singlePokemon.name}`);
            }}
            className="border border-black p-2 mt-5 mb-5"
          >
            view details
          </button>
        </div>
      ))}
      <div className="flex justify-center mt-10">
        <button
          className="mr-2 border border-black p-2"
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
          className="ml-2 border border-black p-2"
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

export default Home;
