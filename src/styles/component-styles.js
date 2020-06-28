import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    widget: {
        height: "95vh",
        margin: 0
    },
    zomatowidget: {
        height: "100vh",
        zIndex: 1,
        position: "absolute",
        left: 0,
        top: 0
    },
    restaurants: {
        position: "absolute",
        bottom: 20,
        zIndex: 1,
        color: "white",
        left: 20,
        right: 0,
        margin: "0 auto",
        display: "flex",
        overflow: "scroll"
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    card:{
        width: 200,
        height: 250,
        marginRight: 20,
        position: "relative"
    },
    card_dark: {
        width: 200,
        height: 250,
        marginRight: 20,
        position: "relative",
        backgroundColor: "black !important",
        color: "white !important"
    },
    name: {
        fontSize: "1.2rem !important",
        fontWeight: 900,
        margin: "5px 0px",
        fontFamily: "Poppins",
        whiteSpace: "nowrap !important",
        overflow: "hidden"
    },
    address: {
        fontWeight: 600,
        fontSize: 12,
        marginTop: 4,
        lineHeight: "1rem !important",
        display: "-webkit-box",
        color: "#625555",
        WebkitLineClamp: 3,
        overflow: "hidden",
        WebkitBoxOrient: "vertical",
        marginBottom: 5
    },
    address_dark: {
        fontWeight: 600,
        fontSize: 12,
        marginTop: 4,
        lineHeight: "1rem !important",
        display: "-webkit-box",
        color: "#d4cdcd",
        WebkitLineClamp: 3,
        overflow: "hidden",
        WebkitBoxOrient: "vertical",
        marginBottom: 5
    },

    detail_address: {
        fontSize: "1.3rem",
        marginBottom: 5,
        color: "#625555",
    },
    r_image: {
        marginTop: 20,
        width: "100%",
    },
    paper: {
        padding: 10,
        margin: 20,
        width: "250px"
    },
    heading: {
        margin: "20px 0px 0px"
    },
    rating: {
        margin: 0
    },
    h2: {
        margin: 0,
        marginTop: 20,
        marginBottom: 5
    },
    cuisines: {
        marginTop: 5,
        fontSize: "1.3rem"
    },
    timings: {
        fontSize: "1rem",
        fontWeight: 600
    },
    detail_container: {
        marginBottom: "5vh"
    },
    btn: {
        padding: "5px 13px"
    },
    link: {
        textDecoration: "none",
        backgroundColor: "#ececec"
    },
    fabicon: {
        position: "absolute !important",
        top: "93px",
        right: "10px"
    },
    infowindow_dark: {
        backgroundColor: "black !important",
        color: "white !important",
        fontSize: "1rem",
        fontWeight: 600,
        borderRadius: "10px !important"
    },
    infowindow_light: {
        backgroundColor: "white !important",
        color: "black !important",
        fontSize: "1rem",
        fontWeight: 600,
        borderRadius: "10px !important"
    },
}));

export default useStyles