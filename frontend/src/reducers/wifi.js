const initialState = [];

export default function wifi(state = initialState, action) {
    if (action.type === 'wifi') {
        return action.payload;
    }else if(action.type === 'getwifi'){
        return action.payload;
    }
    return state;
}
