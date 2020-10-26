import React, { useEffect, useContext } from 'react'
import MapWrapper from "../components/MapComponent"
import ZomatoWidget from "./ZomatoWidget"
import RestaurantShow from "./RestaurantShow"
import Restaurants from "../components/Restaurants"
import axios from '../axios-config';
import MapContext from "../context/MapContext"
import Brightness4Icon from '@material-ui/icons/Brightness4';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';

const Layout = () => {
    const context = useContext(MapContext)

    const getCurrentLocation = () => {
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const current_pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
                context.setCurrentLocation(current_pos)
                context.setLocation(current_pos)
                axios.get(`/geocode?lat=${current_pos.lat}&lon=${current_pos.lng}`)
                    .then(response => {
                        context.setRestaurants(response.data.nearby_restaurants)
                    })
                    .catch(err => console.log(err))
            }, () => {
                const default_pos = {
                    lat: 12.9674418,
                    lng: 77.5333044
                }
                context.setCurrentLocation(default_pos)
                context.setLocation(default_pos)
            })
        }
    }

    useEffect(() => {
        getCurrentLocation()
    }, [])

    const handleDrawer = () => {
        context.setOpen(!context.open);
    };

    const toggleTheme = () => {
        context.setTheme(!context.theme)
    }
    const handleCurrentLocation = () => {
        context.setLocation(context.currentLocation)
        axios.get(`/geocode?lat=${context.currentLocation.lat}&lon=${context.currentLocation.lng}`)
            .then(response => {
                context.setRestaurants(response.data.nearby_restaurants)
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="container">
            <div className="toggle-btn">
                <button onClick={handleDrawer}>Zomato Widget</button>
            </div>
            <div className={context.theme ? "theme-light" : "theme-dark"} >
                <button onClick={toggleTheme}>
                    {context.theme ? <WbSunnyIcon /> : <Brightness4Icon />}
                </button>
            </div >
            <div className={context.theme ? "loc-light" : "loc-dark"} >
                <button onClick={handleCurrentLocation}>
                   <GpsFixedIcon />
                </button>
            </div >
            <MapWrapper/>
            <Restaurants
                nearby_restaurants={context.nearby_restaurants}
            />
            <ZomatoWidget />
            <RestaurantShow />
        </div>
    )
}

export default Layout
