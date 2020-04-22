<template>
  <div>
    <q-icon name="mdi-run-fast" class="text-teal" style="font-size: 15em;" />
    <p class="text-center">{{ $t('oauth.callback.line1') }}</p>
    <p class="text-center">{{ $t('oauth.callback.line2') }} ({{ countdown.times }})</p>
  </div>
</template>

<script>
// import { mapActions, mapState } from 'vuex'
import { queryparams } from 'boot/mixin_queryparams'
import { countdown } from 'boot/mixin_countdown'
export default {
  mixins: [queryparams, countdown],
  data() {
    return {
      countdown: {
        times: 3
      }
    }
  },
  created() {
    // Would be more easier if Purecloud return the params as query string
    // Example: http://localhost:8080/oauth/callback?access_token=<token>&expires_in=<time>&token_type=<type>
    // So, otherwise will only need to use this.$route.params.access_token
    // But as they return the values as '#' char, was need to make a special method
    // Example: http://localhost:8080/oauth/callback#access_token=<token>&expires_in=<time>&token_type=<type>
    const params = this.getQueryParams()

    // Callback doesnt work, will not login
    if (Object.keys(params).length === 0) {
      return this.$router.push({ name: 'oauth.error' })
    }

    console.log(this.$store.getters['app/getHttpReferrer'])

    // Starting countdown callback
    this.startCountdown()

    // Logged
    this.$store.dispatch('oauth/saveAccessData', params)
    this.$store.dispatch('user/fetchUserDetails')
  },

  methods: {
    dispatchAfterCountdown() {
      const referrer = this.$store.getters['app/getHttpReferrer'] || '/'
      return this.$router.push(referrer)
    }
  }
}
</script>
