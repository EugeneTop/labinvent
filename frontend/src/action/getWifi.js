import axios from 'axios';

export const getWifi = () => dispatch => {
    return axios.get('http://localhost:5000/')
        .then(response => {
            dispatch({ type: 'getWifi', payload: response.data })
        });
}