# NBA_map
Utilizes leaflet's map api to create a map UI connected to a mongoDB backend and enables users to find the closest NBA team to an American city. To run the microservice, type npm run server.

## Usage
### Connect node server to MongoDB

The map_server, a connection was established between a node express server and the MongoDB database that I had created. The .env files contain the URI and port that the node server utilizes for the connection.

### Crud Functions

I had only implemented a GET for all of the US teams as well as a search for a specific city. For both GET requests, a longitude and laitutde is sent back which is used within the logic for the locations on the map. The GET request for all US teams also sends back the team name and city. The GET request for a specific city, checks the query object within the req paramater to obtain whatever the user has placed within a search bar. All GET requests sends back data in a .json format.

## React frontend

The map_frontend utilizes react as an example program of how a map layer can be implemented.

### React-leaflet

The React-leaflet is a dependency installed in the package.json folder. Here is a link to the installation for the dependency: https://react-leaflet.js.org/docs/start-installation/

React-leaflet enables a user to create a map layer that can take parameters of longitude and latitude to pinpoint locations that you would want. A marker objet is used for pins while a popup object is used for creating a text-box for information that can be opened on a click of a marker object.

### Search functionality

A search functionality was made to assist in creating a search for a city. When searching for a city, a request is sent to the backend and a list of corresponding cities can be found.

### Search debugging

Right click on the webpage when running the frontend and backend of the server. Click 'inspect' and check the console tab, this tab will list all of the cities that align with what the user enters within the search bar.

## Example Request/Receive on backend
```
const getCities = asyncHandler( async (req, res) => {
    const query = req.query.query;

    try {
        //requests data obtained from query from MongoDB
        const searchResults = await City.find({ City: { $regex: query, $options: 'i'} }).limit(5);

        //receives and returns the response
        res.json(searchResults);
    } catch (error) {
        console.error('Error searching in MongoDB:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
```

## Example Request/Receive on frontend
```
 //call backend to grab city data
    useEffect(() => {
        const fetchTeamcoords = async () => {
            //this requests data
            const response = await fetch('http://localhost:5000/map/')
            //this converts the response to json format that is received
            const json = await response.json()

            //check response
            if (response.ok){
                //this uses a statehook
                console.log('response is ok')
                setTeamCoords(json)
            }
        }

        fetchTeamcoords()
    }, [])
```

