import axios from 'axios'

export default function fetchApi(url) {
    return axios({
        method: 'GET',
        url: url, 
        headers: {
            'Content-Type': 'application/json',
            //"Accept": 'application/json',
        }
    })
}