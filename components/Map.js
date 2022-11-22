import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { useState } from "react";
import { getCenter } from 'geolib';
import { LocationMarkerIcon } from '@heroicons/react/outline'
import Image from "next/image"
import styled from "styled-components";


function Map({ searchResults }) {

// for the pop-up marker, passing the object
const [selectedLocation, setSelectedLocation] = useState({})

// Transform the search result into latitude and longitude for geolib
// { latitude: 52.516172, longitude: 13.124567}
const coordinates = searchResults.map(result => ({
    longitude: result.long,
    latitude: result.lat
}))

// Center of the searched results using geoLib
const center = getCenter(coordinates)

const [viewport, setViewport] = useState({
    width: "100%",
    height: "40%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11
})

    return (
        <ReactMapGL
            mapStyle="mapbox://styles/picozzimichele/cktb8m68o61g917ofy0jx1q8j"
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
            {searchResults.map((result, index) => (
                <div key={result.long}>
                    <Marker
                        longitude={result.long}
                        latitude={result.lat}
                        offsetLeft={0}
                        offsetTop={0}
                    >
                        <p onClick={() => setSelectedLocation(result)} className="cursor-pointer text-2xl animate-bounce">
                            <LocationMarkerIcon className="h-6 text-red-500"/>
                        </p>
                    </Marker>

                    {/* Popup to be shown once we click on the marker */}
                    {selectedLocation.long === result.long ? (
                            <Popup 
                                onClose={() => setSelectedLocation({})}
                                closeOnClick={true}
                                latitude={result.lat}
                                longitude={result.long}
                            >
                                <div>
                                    <img src={result.img} />
                                    <h5>{result.title}</h5>
                                    <h4>{result.price}</h4>
                                </div>
                                    
                            </Popup>
                    ) : (
                        false
                    )}
                </div>
            ))}
        </ReactMapGL>
    )
}

export default Map

