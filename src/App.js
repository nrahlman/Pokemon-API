import './App.css';
import { fetchPokemon } from './API/fetchPokemon';
import { useEffect, useState } from 'react';

function App() {
  const [pokemons, setPokemons]=useState([])
  const [singlePokemon, setSinglePokemon]=useState([])
  const [currentPage, setCurrentPage]=useState(1)
  const pokemonPerPage = 5

  useEffect(()=>{
    const getAllPokemon= async()=>{
      const pokemons=await fetchPokemon();
      setPokemons(pokemons)
    }
    getAllPokemon();
    
    console.log(pokemons)
  },[])

  useEffect(()=>{
    async function GrabAllPokemon (url, index){
      const fetchAllPokemon= await fetch(url)
      const data= await fetchAllPokemon.json()
    setSinglePokemon((pokemonArray)=>{
      const newPokemonArray=[...pokemonArray]
      newPokemonArray[index]=data
      return newPokemonArray
    })
}
pokemons.forEach((pokemon, index)=>{
  GrabAllPokemon(pokemon.url, index)
})
 
}, [pokemons])
const indexOfLastPokemon= currentPage * pokemonPerPage
const indexOfFirstPokemon= indexOfLastPokemon-pokemonPerPage
const currentPokemon= singlePokemon.slice(indexOfFirstPokemon, indexOfLastPokemon)

const pagination = (pageNumber)=>{
  setCurrentPage(pageNumber)
}

console.log("singlepokemon", singlePokemon)
  return (
    <div className="App">
     {currentPokemon.map((singlePokemon, index)=>(
      <div key={singlePokemon.name}>
        <h1>{singlePokemon.name}</h1>
        <img alt={singlePokemon.name} src={singlePokemon.sprites.back_default}></img>
        <div>Weight {singlePokemon.weight}</div>
        <div>Height {singlePokemon.height}</div>
      </div>
     ))}
      <div className='pagination'>
        <button className='backPagination' onClick={()=>{
           if(currentPage>1){
            pagination(currentPage-1)
           }
        }
         
        }>&lt;&lt;&lt;</button>
        <div className={currentPage===1? "active": "nonActive"}
        onClick={()=>{pagination(1)}}>1</div>
        <div className={currentPage===2? "active": "nonActive"}
        onClick={()=>{pagination(2)}}>2</div>
        <div className={currentPage===3? "active": "nonActive"}
        onClick={()=>{pagination(3)}}>3</div>
        <div className={currentPage===4? "active": "nonActive"}
        onClick={()=>{pagination(4)}}>4</div>
        <button className='forwardPagination' onClick={()=>{
           if(currentPage<4){
            pagination(currentPage+1)
           }
        }
         
        }>&gt;&gt;&gt;</button>
      </div>
    </div>
  );


}

export default App;