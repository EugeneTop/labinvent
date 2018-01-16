import { combineReducers } from 'redux';

import getWifi from './getWifi';
import ethernet from './ethernet';
import wifi from './wifi';

export default combineReducers({
    getWifi,
    ethernet,
    wifi
});