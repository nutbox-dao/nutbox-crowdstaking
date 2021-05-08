
export const BLOCK_SECOND = 6

export const TIME_PERIOD = {
    MINUTES:60,
    HOUR: 3600,
    DAY: 86400,
    WEEK: 604800,
    MONTH: 2592000,
}

export const API_CONNECT_STATE = {
    CONNECT_INIT: 'CONNECT_INIT',
    CONNECT: 'CONNECT',
    CONNECT_SUCCESS: 'CONNECT_SUCCESS',
    CONNECT_ERROR:'CONNECT_ERROR'
}

export const BID_PERIOD = {
    POKALDOT: 60 * 60 / BLOCK_SECOND,
    KUSAMA: 60 * 60 / BLOCK_SECOND,
    ROCOCO: 60 * 60 / BLOCK_SECOND
}

export const RETIRING_PERIOD = {
    POKALDOT: 60 * 60,
    KUSAMA: 60 * 60,
    ROCOCO: 60 * 60
}

export const Test_Crowdstaking_Data = [
    {
        id: '0',
        name: 'BML',
        icon: 'https://cdn.wherein.mobi/crowdloan/logo/bml.png'
    },
    {
        id: '1',
        name: 'Peanut',
        icon: 'https://cdn.wherein.mobi/nutbox.png'
    }
]