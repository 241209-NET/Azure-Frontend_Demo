import React, {useState, useEffect} from 'react'
import axios from 'axios'

function PetSearch() {

    //Setting up state variables
    const [petToFind, setPetToFind] = useState(1); //By default, it loads Bulbasaur 
    const [petData, setPetData] = useState(null); //By default, before the user searches this is null

    //Setting up our useEffect to fetch pokemon data when component mounts OR when it re-renders
    useEffect(() => {
        
        //This is a function that I will call to send that GET request to the pokeAPI
        const fetchPetData = async () => {
            try{
                //First we try to get a response from pokeAPI
                const response = await axios.get(`https://petsdb.azurewebsites.net/api/pet/id/${petToFind}`); 
                
                setPetData({
                    id: response.data.id,
                    name: response.data.name,
                    type: response.data.type,
                    dob: response.data.birthday
                });

            } catch (error) {
                console.error('Error fetching Pet data:', error)
                setPetData(null);
            }
        };

        //Here we just call the function
        fetchPetData();

    }, [petToFind]); // UseEffect exepcts a dependency array as a second argument.
    //Even if you have none, omitting this can result in an infinite loop. 

    const handleInputChange = (event) => {
        setPetToFind(event.target.value);
    }


  return (
    <div>
        <h2>Pet Search</h2>
        <input 
            type="text" 
            value={petToFind}
            onChange={handleInputChange}
            placeholder='Enter pet id to search for'
        />

        {/* Conditionally render the pokeData if any has ben returned */}
        {
            petData ? (
                <div>
                    <h3>{petData.name}</h3>
                    <p>Type: {petData.type}</p>
                    <p>Birthday: {petData.dob}</p>
                </div>
            ) : (
                <div>
                    <p>Loading Pet data...</p>
                </div>
            )
        }



    </div>
  )
}

export default PetSearch