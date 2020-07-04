import React, { useState, useContext } from 'react'
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import mapStyles from "../styles/map-style"
import MarkerIcon from "../images/marker.svg"
import RestaurantMarker from "../images/markerone.png"
import MapContext from '../context/MapContext'
import InfoWindow from './InfoWindow'
import axios from '../axios-config'
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");

/*global google*/

const MapComponent = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_KEY}&v=3.exp&libraries=geometry,drawing`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100vh` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap
        defaultZoom={16}
        ref={ref => props.handleSetRef(ref)}
        center={{ lat: props.location.lat, lng: props.location.lng }}
        onDragEnd={props.handleRestaurants}
        options={{
            fullscreenControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            zoomControlOptions: {
                position: google.maps.ControlPosition.TOP_RIGHT
            },
            styles: props.theme ? null : mapStyles
        }}
    >
        {
            props.markers && props.markers.map((item, i) => {
                const { latitude, longitude } = item.restaurant.location
                return (
                    <div key={i}>
                        <Marker
                            position={{ lat: Number(latitude), lng: Number(longitude) }}
                            icon={{
                                url: RestaurantMarker,
                                scaledSize: item.restaurant.id === props.hoveredCard ? { width: 50, height: 50 } : { width: 35, height: 35 }
                            }}
                            onClick={() => props.handleInfowindow(item)}
                        />
                        {
                            props.infowindow && props.markerId===item.restaurant.id ? <InfoBox
                                defaultPosition={new google.maps.LatLng(Number(latitude), Number(longitude))}
                            >
                                <InfoWindow item={item} context={props.context}/>
                            </InfoBox> : null
                        }

                    </div>
               )
            })
        }

        <Marker
            position={{ lat: props.location.lat, lng: props.location.lng }}
            icon={{
                url: MarkerIcon,
                scaledSize: { width: 50, height: 50 },
            }}
        />
    </GoogleMap>
)

const MapWrapper = React.memo(() => {
    const context = useContext(MapContext)
    const [mapRef, setMapRef] = useState(null)
    const [infowindow, setInfowindow] = useState(false)
    const [markerId, setMarkerId] = useState(null)

    const handleInfowindow = (item) => {
        setInfowindow(!infowindow)
        setMarkerId(item.restaurant.id)
    }

    const handleSetRef = (ref) => {
        setMapRef(ref)  // referce to the google map component
    }

    const handleRestaurants = () => {
        const map = mapRef.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.center
        context.setLocation({
            lat: Number(map.lat()),
            lng: Number(map.lng())
        })
        axios.get(`/geocode?lat=${context.location.lat}&lon=${context.location.lng}`)
            .then(response => {
                context.setRestaurants(response.data.nearby_restaurants)
            })
            .catch(err => console.log(err))
    }

    return (
        <MapComponent
            currentLocation={context.currentLocation}
            location={context.location}
            markers={context.nearby_restaurants}
            hoveredCard={context.hoveredCard}
            theme={context.theme}
            infowindow={infowindow}
            markerId={markerId}
            handleInfowindow={handleInfowindow}
            context={context}
            handleRestaurants={handleRestaurants}
            handleSetRef={handleSetRef}
        />
    )
})

export default MapWrapper
