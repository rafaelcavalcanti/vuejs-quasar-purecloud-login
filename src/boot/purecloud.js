const purecloud = require('purecloud-platform-client-v2/dist/node/purecloud-platform-client-v2')

export default ({ Vue, store }) => {
  // If the page was refreshed, so need to be update the accesstoken
  const accessTokenValid = store.getters['oauth/isAccessTokenValid']
  if (accessTokenValid) {
    const accessToken = store.getters['oauth/getAccessToken']
    const client = purecloud.ApiClient.instance
    client.setAccessToken(accessToken)
    client.setPersistSettings(true)
  }

  // Injecting Purecloud injection
  Vue.prototype.$purecloud = purecloud
}
