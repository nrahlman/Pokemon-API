const URL=`https://pokeapi.co/api/v2/pokemon`

export const fetchPokemon=async()=>{
try {
    const response= await fetch(URL)
    const {results}=await response.json(); 
    console.log(results)
    return results
    
} catch (error) {
    console.log("pokemon not found")
}   
}

