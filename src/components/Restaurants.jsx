import React, { useContext } from 'react'
import useStyles from '../styles/component-styles'
import { Card, CardMedia, CardContent, CardActionArea, Fab } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import MapContext from '../context/MapContext';
import DirectionsIcon from '@material-ui/icons/Directions';


const Restaurants = React.memo(() => {
    const context = useContext(MapContext)
    const classes = useStyles()

    const getHoveredCard = (item) => {
        const { id } = item.restaurant
        context.setHoveredCard(id)
    }
    const getCard = (item) => {
        context.setSelectedCard(item.restaurant)
        context.setOpenDetailModal(true)
    }

    return (
        <div className={classes.restaurants}>
            {
                context.nearby_restaurants.map((item, i) => {
                    return (
                        <div key={i}>
                            <Card
                                className={context.theme ? classes.card : classes.card_dark}
                                onMouseOver={() => getHoveredCard(item)}
                                onMouseOut={() => context.setHoveredCard(0)}
                            >
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image={item.restaurant.featured_image}
                                        title={item.restaurant.name}
                                    />
                                    <a href={`https://maps.google.com/?saddr=${context.currentLocation.lat},${context.currentLocation.lng}&daddr=${item.restaurant.location.latitude},${item.restaurant.location.longitude}`} target="_blank" rel="noopener noreferrer">
                                        <Fab size="small" aria-label="add"
                                            className={classes.fabicon}
                                        >
                                            <DirectionsIcon />
                                        </Fab>
                                    </a>
                                    <CardContent onClick={() => getCard(item)}>
                                        <p className={classes.name} >
                                            {item.restaurant.name}
                                        </p>
                                        <p className={context.theme ? classes.address : classes.address_dark}>
                                            {item.restaurant.location.address}
                                        </p>
                                        <Rating
                                            name="rating"
                                            defaultValue={Number(item.restaurant.user_rating.aggregate_rating)}
                                            size="small"
                                        />
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
                    )
                })
            }
        </div>
    )
})

export default Restaurants
