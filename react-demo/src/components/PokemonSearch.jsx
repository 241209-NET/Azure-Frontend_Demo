import React, {useState, useEffect} from 'react'
import axios from 'axios'

function PokemonSearch() {

    //Setting up state variables
    const [pokemonToFind, setPokemonToFind] = useState(1); //By default, it loads Bulbasaur 
    const [pokemonData, setPokemonData] = useState(null); //By default, before the user searches this is null

    //Setting up our useEffect to fetch pokemon data when component mounts OR when it re-renders
    useEffect(() => {
        
        //This is a function that I will call to send that GET request to the pokeAPI
        const fetchPokemonData = async () => {
            try{
                //First we try to get a response from pokeAPI
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonToFind}`); 
                
                setPokemonData({
                    name: response.data.name,
                    sprite: response.data.sprites.front_default,
                    types: response.data.types.map((typeInfo) => typeInfo.type.name).join(', '),
                });

            } catch (error) {
                console.error('Error fetching Pokemon data:', error)
                setPokemonData(null);
            }
        };

        //Here we just call the function
        fetchPokemonData();

    }, [pokemonToFind]); // UseEffect exepcts a dependency array as a second argument.
    //Even if you have none, omitting this can result in an infinite loop. 

    const handleInputChange = (event) => {
        setPokemonToFind(event.target.value);
    }


  return (
    <div>
        <h2>Pokemon Search</h2>
        <input 
            type="text" 
            value={pokemonToFind}
            onChange={handleInputChange}
            placeholder='Enter pokemon to search for'
        />

        {/* Conditionally render the pokeData if any has ben returned */}
        {
            pokemonData ? (
                <div>
                    <h3>{pokemonData.name}</h3>
                    <img src={pokemonData.sprite} alt={pokemonData.name} />
                    <p>Type(s): {pokemonData.types}</p>
                </div>
            ) : (
                <div>
                    <p>Loading Pokemon data...</p>
                </div>
            )
        }



    </div>
  )
}

export default PokemonSearch