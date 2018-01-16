const initialState = [];

export default function etherneta(state = initialState, action) {
    if (action.type === 'ethernet' || action.type === 'getethernet') {
        return action.payload;
    }
    return state;
}
