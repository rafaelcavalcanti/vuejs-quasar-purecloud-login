<template>
  <div class="text-center">
    <img src="~/assets/purecloud-logo.jpg" width="300" />
    <br />
    <p class="text-center">{{ $t('oauth.redirecting.label') }} ({{ countdown.times }})</p>
    <p class="text-center" v-if="countdownFail">{{ $t('oauth.redirecting.fail.text') }}</p>
    <q-btn
      color="secondary"
      v-if="countdownFail"
      style="width:200px;"
      @click="forceLogin()"
      :label="$t('oauth.redirecting.fail.btn')"
    />
  </div>
</template>

<script>
import { countdown } from 'boot/mixin_countdown'
export default {
  mixins: [countdown],
  data() {
    return {
      countdownFail: false
    }
  },
  created() {
    // Saving http referer
    const httpReferrer = this.$route.query.referrer
    this.$store.dispatch('app/saveHttpReferrer', httpReferrer)

    // Countdown...
    this.startCountdown()
  },
  methods: {
    dispatchAfterCountdown() {
      this.countdownFail = !this.countdownFail
      return this.forceLogin()
    },
    forceLogin() {
      return this.$store.dispatch('oauth/login')
    }
  }
}
</script>
