import Vue from 'vue'
import * as types from '../mutation-types'
import { Cookies } from 'quasar'

// state
export const state = {
  access_token: Cookies.has('access_token')
    ? Cookies.get('access_token')
    : null,
  access_token_expires_in: null,
  client_id: process.env.PURECLOUD_CLIENT_ID,
  home_url: process.env.APP_HOME,
  oauth_callback: process.env.PURECLOUD_OAUTH_CALLBACK
}

// getters
export const getters = {
  getAccessToken: state => state.access_token,
  isAccessTokenValid: state => {
    return state.access_token !== null && state.access_token !== 'undefined'
  },
  isAuth: (state, getters, rootState) => {
    return (
      state.access_token !== null &&
      state.access_token !== 'undefined' &&
      rootState.user.user_details !== null &&
      rootState.user.user_details.state === 'active'
    )
  }
}

// mutations
export const mutations = {
  [types.OAUTH_ACCESS_TOKEN](state, value) {
    state.access_token = value
  },
  [types.OAUTH_ACCESS_TOKEN_EXPIRES_IN](state, value) {
    state.access_token_expires_in = value
  },
  [types.LOGOUT](state) {
    state.access_token = null
    state.access_token_expires_in = null
  }
}

// actions
export const actions = {
  login({ commit, state }) {
    // Redirects errors: https://developer.mypurecloud.com/api/rest/authorization/error-redirects.html
    const client = Vue.prototype.$purecloud.ApiClient.instance
    client
      .loginImplicitGrant(state.client_id, state.oauth_callback)
      .then(data => {
        // commit(types.ACCESS_TOKEN_SAVE, data.access_token)
      })
      .catch(err => console.log('login_err', err))
  },
  saveAccessData({ commit }, data) {
    const client = Vue.prototype.$purecloud.ApiClient.instance
    client.setAccessToken(data.access_token)
    client.setPersistSettings(true)

    commit(types.OAUTH_ACCESS_TOKEN_EXPIRES_IN, data.expires_in)
    commit(types.OAUTH_ACCESS_TOKEN, data.access_token)

    // Pesistence
    Cookies.set('access_token', data.access_token, {
      expires: `${data.expires_in}s`, // in seconds
      path: '/'
      // httpOnly: true
    })
  },
  logout({ commit }) {
    // Reseting auth token
    commit(types.LOGOUT)

    // Removing cookies
    Cookies.remove('access_token', {
      expires: '0s',
      path: '/'
    })

    // Reseting user details
    commit(`user/${types.USER_DETAILS_RESET}`, null, { root: true })

    const client = Vue.prototype.$purecloud.ApiClient.instance
    client.logout()
    // client
    //   .logout(state.home_url)
    //   .then(() => {
    //     commit(types.LOGOUT)
    //     commit(types.USER_DETAILS_RESET)
    //   })
    //   .catch(err => {
    //     console.log('There was a failure calling deleteOauthClient')
    //     console.error(err)
    //   })
  }
}
