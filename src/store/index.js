import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// Load store modules dynamically.
const requireContext = require.context('./modules', false, /.*\.js$/)
const modules = requireContext
  .keys()
  .map(file => [file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)])
  .reduce((modules, [name, module]) => {
    if (module.namespaced === undefined) {
      module.namespaced = true
    }

    return { ...modules, [name]: module }
  }, {})

// Importing the store dynamicly
export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: modules,

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })
  return Store
}
