import Vue from 'vue'
import * as types from '../mutation-types'
import { Cookies } from 'quasar'

// states
export const state = {
  user_details: Cookies.has('user_details')
    ? Cookies.get('user_details')
    : null,
  fetch_details_error: null
}

// getters
export const getters = {
  getUserDetails: state => state.user_details,
  getUserName: state => state.user_details.name
}

// mutations
export const mutations = {
  [types.USER_DETAILS_SET](state, value) {
    state.user_details = value
  },
  [types.USER_DETAILS_RESET](state) {
    state.user_details = null
    Cookies.remove('user_details', {
      expires: '0s',
      path: '/'
    })
  },
  [types.USER_DETAILS_FETCH_ERROR](state, value) {
    state.fetch_details_error = value
  }
}

// actions
export const actions = {
  async fetchUserDetails({ commit, state, rootState }) {
    const apiInstance = new Vue.prototype.$purecloud.UsersApi()
    apiInstance
      .getUsersMe()
      .then(data => {
        commit(types.USER_DETAILS_SET, data)

        Cookies.set('user_details', data, {
          expires: `${rootState.oauth.access_token_expires_in}s`, // in seconds
          // httpOnly: true,
          path: '/'
        })
      })
      .catch(err => {
        commit(types.USER_DETAILS_FETCH_ERROR, err)
      })
  }
}
