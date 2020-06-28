import Axios from "axios"

const axios = Axios.create({
    baseURL: 'https://developers.zomato.com/api/v2.1',
    headers: {
        "user-key": "c14e01e6bc958b301d097b4914d3ec94"
    }
});

export default axios