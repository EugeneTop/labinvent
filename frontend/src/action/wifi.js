import axios from 'axios';

export const postWifi = (name, securityKey, ip, mask, gateway, prefDNS, altDNS, token) => dispatch => {
    return axios.post('http://localhost:5000/Wifi', {
        name: name,
        securityKey: securityKey,
        ip: ip,
        mask: mask,
        gateway: gateway,
        prefDNS: prefDNS,
        altDNS: altDNS,
        token: token
    })
        .then(response => {
            dispatch({ type: 'wifi', payload: response.data })
        });
}

export const getWf = (token) => dispatch => {
    return axios.get('http://localhost:5000/wifi/' + token)
        .then(response => {
            dispatch({ type: 'getwifi', payload: response.data })
        });
}