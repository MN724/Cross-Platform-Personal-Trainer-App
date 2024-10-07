import { useEffect, useState } from "react";
//leaflet map
//import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import SearchBar from "../component/searchBar";

const AmericaMap = () => {
    const [TeamCoords, setTeamCoords] = useState(null);

    //call backend to grab city data
    useEffect(() => {
        const fetchTeamcoords = async () => {
            const response = await fetch('http://localhost:5000/map/')
            const json = await response.json()

            //check response
            if (response.ok){
                console.log('response is ok')
                setTeamCoords(json)
            }
        }
        
        fetchTeamcoords()
    }, [])

    return (
        <div className="map">
            <SearchBar />
            <MapContainer center={[35.00, -95.07]} zoom={5} scrollWheelZoom={false}>

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {TeamCoords && TeamCoords.map((coord) => (
                    //display each coordinate and send to map it
                    <Marker key={coord._id} position={[coord.Latitude, coord.Longitude]}>
                        <Popup>
                            <ul key={coord.Team}>Team: {coord.Team}</ul>
                            <ul key={coord.City}>City: {coord.City}</ul>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}

export default AmericaMap
