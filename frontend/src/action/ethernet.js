import axios from 'axios';

export const postEthernet = (ip, mask, gateway, prefDNS, altDNS) => dispatch => {
    return axios.post('http://localhost:5000/ethernet', {
        ip: ip,
        mask: mask,
        gateway: gateway,
        prefDNS: prefDNS,
        altDNS: altDNS
    })
        .then(response => {
            dispatch({ type: 'ethernet', payload: response.data })
        });
}

export const getEthernet = (token) => dispatch => {
    return axios.get('http://localhost:5000/ethernet/' + token)
        .then(response => {
            dispatch({ type: 'getethernet', payload: response.data })
        });
}