import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSinglePokemon } from "../API/fetchPokemon";
import { useNavigate } from "react-router-dom";

const SinglePokemon = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    const fetchPokemon = async () => {
      const singlePokemon = await fetchSinglePokemon(name);
      setPokemon(singlePokemon);
    };
    fetchPokemon();
  }, [name]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-center h-screen flex justify-center items-center">
      <div className="text-center bg-gray-200">
        <h1 className="text-3xl font-bold mb-5">{pokemon.name}</h1>
        <div className="flex justify-center">
          <div className="mr-10 text-2xl font-bold">
            {" "}
            Default Form
            <img
              alt={pokemon.name}
              src={pokemon.sprites.front_default}
              className="mx-auto w-48 h-48"
            />
            <img
              alt={pokemon.name}
              src={pokemon.sprites.back_default}
              className="mx-auto w-48 h-48"
            />
          </div>
          <div className="text-2xl font-bold">
            {" "}
            Shiny Form
            <img
              alt={pokemon.name}
              src={pokemon.sprites.front_shiny}
              className="mx-auto w-48 h-48"
            />
            <img
              alt={pokemon.name}
              src={pokemon.sprites.back_shiny}
              className="mx-auto w-48 h-48"
            />
          </div>
        </div>
        <div className="text-lg font-bold">ID: {pokemon.id}</div>
        <div className="text-lg font-bold">Weight: {pokemon.weight}</div>
        <div className="text-lg font-bold">Height: {pokemon.height}</div>
        <div className="text-lg font-bold">Species: {pokemon.species.name}</div>
        <div className="text-lg font-bold">
          Type:{" "}
          {pokemon.types[0].type.name ? pokemon.types[0].type.name : "N/A"}
          {pokemon.types[1] ? `, ${pokemon.types[1].type.name}` : ""}
          {pokemon.types[2] ? `, ${pokemon.types[2].type.name}` : ""}
        </div>
        <button
          onClick={() => {
            nav("/");
          }}
          className="border border-black p-2 mt-5"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default SinglePokemon;
