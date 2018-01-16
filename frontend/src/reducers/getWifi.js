const initialState = [];

export default function getWifi(state = initialState, action) {
    if (action.type === 'getWifi') {
        return action.payload;
    }
    return state;
}
