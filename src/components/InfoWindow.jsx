import React from 'react'
import useStyles from "../styles/component-styles"
import { Card, CardContent } from '@material-ui/core';

const InfoWindow = ({ item, context }) => {
    const classes = useStyles();
    return (
        <div>
            <Card className={context.theme ? classes.infowindow_light : classes.infowindow_dark}>
                <CardContent>
                    <p className={classes.title}>
                        {item.restaurant.name}
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

export default InfoWindow
