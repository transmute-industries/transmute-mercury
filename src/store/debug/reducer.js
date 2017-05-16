
export const initialState = {
    web3Provider: localStorage.getItem('web3Provider') || 'testrpc',
    web3DefaultAddress: localStorage.getItem('web3DefaultAddress') || null,
}

import {
    DEBUG_SETTINGS_UPDATED,
} from './actions'

export function debugReducer(state = initialState, action) {
    if (action.type === DEBUG_SETTINGS_UPDATED) {
        return Object.assign({}, state, ...action.payload)
    }
    return state;
}
