import { useEffect, useState } from "react";
import "../stylings/searchbarStyle.css";

const SearchBar = () => {
    const [TeamCoords, setTeamCoords] = useState(null);

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

    const handleChange = (e) => {
        setCity(e.target.value);
        console.log(e.target.value);
        handleSubmit(e);
    };

    const searchResultsList = searchResults.map((cities) => <li className="City">{cities.City}</li>);

    function selectedCity(searchResults) {
        console.log('City Selected')
        if (searchResults.length === 1) {
            return (
                <div className="closestTeam">
                    The Clostest NBA Team to <b>{searchResults[0].City}</b> is: <b>{selectedTeam(searchResults[0])}</b>
                </div>
            )
        }
    }
    
    const selectedTeam = (city) => {
        console.log(city)
        let minDist = 999999999999
        let closestTeam = []
        console.log(TeamCoords)

        for (let i = 0; i < 30; i++) {

            // CITY LONGITUDE AND LAGITUDE ARE FLIPPED IN MONGODB SERVER
            // THE CODE BELOW IS FLIPPED TO CORRECT FOR THE MISTAKE IN THE DATA

            const longitude = city.latitude - TeamCoords[i].Longitude
            console.log('City Longitude: ' + city.latitude)
            console.log('Team Longitude: ' + TeamCoords[i].Longitude)
            console.log('Longitude Dist: ' + longitude)
            const latitude = city.longitude - TeamCoords[i].Latitude
            console.log('City Latitude: ' + city.longitude)
            console.log('Team Latitude: ' + TeamCoords[i].Latitude)
            console.log('Latitude Dist ' + latitude)
            const dist = (longitude ** 2 + latitude ** 2) ** 0.5
            console.log('Min Dist: ' + minDist)
            console.log('Dist: ' + dist)
            if (dist < minDist) {
                minDist = dist
                closestTeam = TeamCoords[i]
                console.log('Min Dist: ' + minDist)
                console.log('Dist: ' + dist)
                console.log(closestTeam)
            }
        }
        console.log(closestTeam)
        return closestTeam.Team
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/map/search?query=${city}`);
            if (!response.ok) {
                throw new Error('Failed to fetch search results');
            }
            const data = await response.json();
            console.log(data);
            setSearchResults(data);
            console.log(searchResults);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

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