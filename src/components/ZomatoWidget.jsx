import React, { useContext } from 'react'
import { Button, Dialog, Slide, AppBar, Toolbar, Typography} from '@material-ui/core';
import useStyles from "../styles/component-styles"
import MapContext from '../context/MapContext';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ZomatoWidget = () => {
    const context = useContext(MapContext)
    const classes = useStyles();

    const handleDrawer = () => {
        context.setOpen(!context.open);
    };

    return (
        <div>
            <Dialog fullScreen open={context.open} onClose={handleDrawer} TransitionComponent={Transition}>
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
                <div>
                    <div className={classes.widget} >
                        <iframe
                            src="https://www.zomato.com/widgets/res_search_widget.php?entity_id=104240&entity_type=zomato_place&city_id=4&language_id=1&theme=dark&widgetType=small&sort=popularity"
                            style={{ position: "relative", width: "100%", height: "100%" }}
                            border="0"
                            title="zomato-widget"
                            frameBorder="0"
                        >
                        </iframe>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default ZomatoWidget
