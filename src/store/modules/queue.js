import Vue from 'vue'
import * as types from '../mutation-types'
// import { Cookies } from 'quasar'

// states
export const state = {
  queues: [],
  last_filter: {}
}

// getters
export const getters = {}

// mutations
export const mutations = {
  [types.QUEUE_SET](state, value) {
    state.queues = value
  },
  [types.QUEUE_RESET](state, value = []) {
    state.queues = value
  },
  [types.QUEUE_SET_LAST_FILTER](state, value) {
    state.last_filter = value
  }
}

// actions
export const actions = {
  fetchQueues({ commit, state }, options = {}) {
    const apiInstance = new Vue.prototype.$purecloud.RoutingApi()
    apiInstance
      .getRoutingQueues(options)
      .then(data => {
        const entities = data.entities
        commit(types.QUEUE_SET_LAST_FILTER, options)
        commit(types.QUEUE_SET, entities)
      })
      .catch(err => {
        // commit(types.USER_DETAILS_FETCH_ERROR, err)
        console.log('error: ', err)
      })
  },
  refreshQueues({ commit, dispatch, state }) {
    commit(types.QUEUE_RESET)
    dispatch('fetchQueues', state.last_filter)
  }
}
