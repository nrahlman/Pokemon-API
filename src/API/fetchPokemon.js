const URL=`https://pokeapi.co/api/v2/pokemon`

export const fetchPokemon=async()=>{
try {
    const response= await fetch(URL)
    const {results}=await response.json(); 
    return results
    
} catch (error) {
    console.log("pokemon not found")
}   
}

export async function fetchPokemonData(url) {
    try {
        const response=await fetch (url)
        const data= await response.json();
        return data
    } 
 
    catch (error) {
        console.log("Single pokemon not found")  
    }
}