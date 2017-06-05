import moment from 'moment'

export default [
    {
        type: "ACCESS_REQUESTED",
        payload: {
            requestorAddress: '0xf222757c1c16d839c2c50bbe5447df6166134171',
            accessState: 'Pending'
        },
        meta: {
            id: 0,
            version: 'v0',
            txOrigin: '0xf222757c1c16d839c2c50bbe5447df6166134171',
            created: 1496024532
        }
    },
    {
        type: "ACCESS_REQUESTED",
        payload: {
            requestorAddress: '0xe609757c1c16d839c2c50bbe5447df6166134171',
            accessState: 'Pending'
        },
        meta: {
            id: 1,
            version: 'v0',
            txOrigin: '0xe609757c1c16d839c2c50bbe5447df6166134171',
            created: 1496024532
        }
    },
    {
        type: "ACCESS_GRANTED",
        payload: {
            requestorAddress: '0xf222757c1c16d839c2c50bbe5447df6166134171',
            accessState: 'Granted'
        },
        meta: {
            id: 2,
            version: 'v0',
            txOrigin: '0xf222757c1c16d839c2c50bbe5447df6166134171',
            created: 1496024532
        }
    },
    {
        type: "ACCESS_REVOKED",
        payload: {
            requestorAddress: '0xe609757c1c16d839c2c50bbe5447df6166134171',
            accessState: 'Revoked'
        },
        meta: {
            id: 3,
            version: 'v0',
            txOrigin: '0xe609757c1c16d839c2c50bbe5447df6166134171',
            created: 1496024532
        }
    }
]
