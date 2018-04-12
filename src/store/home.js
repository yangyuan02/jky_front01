import * as types from './mutation-types'

const state = {
    isUpdata: '/api/role_points'
}

const getters = {
    getIsUpdata: state => state.isUpdata
}

const mutations = {
    [types.UPDATA_IS_DATA](state, info) {
        state.isUpdata = info
    }
}

const actions = {
    updataIsData({ commit }, info) {
        commit(types.UPDATA_IS_DATA, info)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
