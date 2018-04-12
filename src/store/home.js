import * as types from './mutation-types'

const state = {
    isUpdata: false
}

const getters = {
    getIsUpdata: state => state.isUpdata
}

export default {
    state,
    getters
}
