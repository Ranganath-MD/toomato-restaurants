import React, { useContext } from 'react'
import { Button, Dialog, Slide, AppBar, Toolbar, Typography, Container, Grid } from '@material-ui/core';
import { Card, CardMedia, CardContent, CardActions, ButtonGroup  } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import useStyles from "../styles/component-styles"
import MapContext from '../context/MapContext';
import MapImage from "../images/map.png"
import DirectionsIcon from '@material-ui/icons/Directions';
import WebIcon from '@material-ui/icons/Web';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const RestaurantShow = () => {
    const context = useContext(MapContext)
    const classes = useStyles();
    const data = context.selectedCard
    const handleDrawer = () => {
        context.setOpenDetailModal(!context.openDetailModal);
    };

    console.log(data && data.featured_image)
    return (
        <div>
            <Dialog fullScreen open={context.openDetailModal} onClose={handleDrawer} TransitionComponent={Transition}>
                <AppBar position="sticky" color="default">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            TooMato
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleDrawer}>
                            Close
                        </Button>
                    </Toolbar>
                </AppBar>
                <Container maxWidth="md">
                    <div className={classes.r_image}>
                        <img src={data && data.featured_image} alt="restaurant" width="100%" />
                    </div>
                    <Grid container spacing={1} className={classes.detail_container}>
                        <Grid item xs={12} sm={12} md={8} lg={8}>
                            <div>
                                <h1 className={classes.heading}>{data && data.name}</h1>
                                <Typography className={classes.detail_address}>
                                    {data && data.location.address}
                                </Typography>
                            </div>
                            <div >
                                <Rating
                                    name="size-large"
                                    defaultValue={Number(data && data.user_rating.aggregate_rating)}
                                />
                                <Typography className={classes.rating}>user rating: {data && data.user_rating.aggregate_rating}</Typography>
                            </div>
                            <div>
                                <h2 className={classes.h2}>Cuisines</h2>
                                <Typography className={classes.detail_address}>{data && data.cuisines}</Typography>
                                <Typography className={classes.timings}>Timings: 9am To 10pm</Typography>
                            </div>
                            <div>
                                <h2 className={classes.h2}>Average Cost</h2>
                                <Typography className={classes.detail_address}>{`${data && data.average_cost_for_two} for two people (Approx.)`}</Typography>
                                <Typography className={classes.msg}>Exclusive of applicable taxes and charges</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <Card className={classes.paper}>
                                <a
                                    href={`https://maps.google.com/?q=${data && data.location.latitude},${data && data.location.longitude}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <CardMedia
                                        className={classes.media}
                                        image={MapImage}
                                        title={data && data.name}
                                    />
                                </a>
                                <CardContent>
                                    <Typography variant="body2" component="p">
                                        {data && data.location.address}
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing className={classes.bt}>
                                    <ButtonGroup color="secondary" aria-label="buttons">
                                        <a
                                            href={`https://maps.google.com/?saddr=${context.currentLocation.lat},${context.currentLocation.lng}&daddr=${data && data.location.latitude},${data && data.location.longitude}`}
                                            target="_blank"
                                            className={classes.link}
                                            rel="noopener noreferrer"
                                        >
                                            <Button startIcon={<DirectionsIcon />} className={classes.btn}>direction</Button>
                                        </a>
                                        <a href={data && data.url} target="_blank" rel="noopener noreferrer" className={classes.link}>
                                            <Button startIcon={<WebIcon />} className={classes.btn}>Website</Button>
                                        </a>
                                    </ButtonGroup>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Dialog>
        </div>
    )
}

export default React.memo(RestaurantShow)
