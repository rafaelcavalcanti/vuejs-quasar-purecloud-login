import * as types from '../mutation-types'
import { Cookies } from 'quasar'

// states
export const state = {
  title_header: 'Olá',
  show_menu_settings: false
}

// getters
export const getters = {
  getTitleHeader: state => state.title_header,
  getHttpReferrer: () => {
    if (Cookies.has('http_referrer')) {
      const redirectToUri = Cookies.get('http_referrer')
      Cookies.remove('http_referrer')
      return redirectToUri
    }
    return null
  }
}

// mutations
export const mutations = {
  [types.APP_TITLE_HEADER](state, value) {
    state.title_header = value
  },
  [types.APP_SETTINGS](state, value) {
    state.show_menu_settings = value
  }
}

// actions
export const actions = {
  updateTitleHeader({ commit }, title) {
    commit(types.APP_TITLE_HEADER, title)
  },
  showMenuSettings({ commit }, value) {
    commit(types.APP_SETTINGS, value)
  },
  saveHttpReferrer({ commit }, httpReferrer) {
    Cookies.set('http_referrer', httpReferrer, { expires: '1d', path: '/' })
  }
}
