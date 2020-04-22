// Making countdown as mixin
const countdown = {
  data() {
    return {
      countdown: {
        times: 5,
        id: null
      }
    }
  },
  methods: {
    startCountdown() {
      const countdown = () => {
        if (this.countdown.times > 0) {
          this.countdown.times--
        } else {
          clearInterval(this.countdown.id)

          this.dispatchAfterCountdown()
        }
      }
      this.countdown.id = setInterval(countdown, 1000)
    },
    stopCountdown() {
      clearInterval(this.countdown.id)
      this.dispatchCountdownCanceled()
    },
    dispatchAfterCountdown() {
      // Do something
    },

    dispatchCountdownCanceled() {
      // Do something
    }
  }
}

export { countdown }
