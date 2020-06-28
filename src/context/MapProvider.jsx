import React, { useState } from 'react'
import MapContext from "./MapContext"

const MapProvider = ({ children }) => {
    const [currentLocation, setCurrentLocation] = useState({
        lat: 12.9674418,
        lng: 77.5333044
    })
    const [location, setLocation] = useState({
        lat: 12.9674418,
        lng: 77.5333044
    })
    const [open, setOpen] = useState(false)
    const [nearby_restaurants, setRestaurants] = useState([])
    const [hoveredCard, setHoveredCard] = useState(0)
    const [selectedCard, setSelectedCard] = useState(null)
    const [openDetailModal, setOpenDetailModal] = useState(false)
    const [directions, getDirections] = useState(null)
    const [theme, setTheme] = useState(false)

    return (
        <MapContext.Provider value={{
            open, setOpen,
            currentLocation, setCurrentLocation,
            nearby_restaurants, setRestaurants,
            hoveredCard, setHoveredCard,
            selectedCard, setSelectedCard,
            openDetailModal, setOpenDetailModal,
            directions, getDirections,
            theme, setTheme,
            location, setLocation
        }}>
            {children}
        </MapContext.Provider>
    )
}

export default MapProvider
