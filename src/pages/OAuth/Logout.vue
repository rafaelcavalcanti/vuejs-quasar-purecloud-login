<template>
  <div>
    <p class="text-center">
      <img src="~assets/sad.svg" style="width:30vw;max-width:150px;" />
    </p>
    <p class="text-center">Going out...bye! ({{ countdown.times }})</p>
    <q-btn color="secondary" style="width:200px;" @click="stopCountdown()" label="Cancel" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { countdown } from 'boot/mixin_countdown'
export default {
  mixins: [countdown],
  created() {
    if (!this.isAuth) {
      // Go back to last page
      return this.$router.back()
    }

    // Start the countdown for logout
    this.startCountdown()
  },
  computed: {
    ...mapGetters('oauth', ['isAuth'])
  },
  methods: {
    dispatchAfterCountdown() {
      return this.$store.dispatch('oauth/logout')
    },
    dispatchCountdownCanceled() {
      return this.$router.back()
    }
  }
}
</script>
