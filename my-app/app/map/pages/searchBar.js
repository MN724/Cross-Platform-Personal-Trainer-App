import { useEffect, useState } from "react";

// Function for the searchbar and all of its methods
const SearchBar = () => {
    const [TeamCoords, setTeamCoords] = useState(null);

    // Retrieves NBA team location coordinates from the backend
    const fetchTeamcoords = async () => {
        console.log('Fetching Team Coords')
        const response = await fetch('http://localhost:5000/map/')
        const json = await response.json()
        setTeamCoords(json)
        console.log(TeamCoords)
    }
    if (!TeamCoords) {
        fetchTeamcoords()
    }

    const [city, setCity] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // Handles any user entered data into the searchbar as it comes in
    const handleChange = (e) => {
        setCity(e.target.value);
        handleSubmit(e);
    };

    // Handles any user entered data that is submitted
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Retrieves city data from the backend based on user input
        try {
            const response = await fetch(`http://localhost:5000/map/search?query=${city}`);
            if (!response.ok) {
                throw new Error('Failed to fetch search results');
            }
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    // Creates a html list of suggested cities
    const searchResultsList = searchResults.map((cities) => <li className="City">{cities.CITY}, {cities.STATE_CODE}</li>);

    // Displays closest NBA team to selected city
    function selectedCity(searchResults) {
        if (searchResults.length > 0) {
            return (
                <div className="closestTeam">
                    The Clostest NBA Team to <b>{searchResults[0].CITY}, {searchResults[0].STATE_CODE}</b> is: <b>{selectedTeam(searchResults[0])}</b>
                </div>
            )
        }
    }
    
    // Determines closest NBA team to the entered city
    const selectedTeam = (city) => {
        let minDist = 999999999999
        let closestTeam = []

        for (let i = 0; i < 30; i++) {
            const longitude = city.LONGITUDE - TeamCoords[i].Longitude
            const latitude = city.LATITUDE - TeamCoords[i].Latitude
            const dist = (longitude ** 2 + latitude ** 2) ** 0.5
            if (dist < minDist) {
                minDist = dist
                closestTeam = TeamCoords[i]
            }
        }
        return closestTeam.Team
    }

    //http://localhost:5000/map/Cities
    return (
        <div className="search-bar">
            <form onSubmit={handleChange}>
                <input type="text"
                placeholder="Search an American City"
                value = {city}
                onChange={handleChange} />
            </form>
            <div className="searchResults">
                {searchResultsList}
            </div>
            {selectedCity(searchResults)}
        </div>
    )
}

export default SearchBar;