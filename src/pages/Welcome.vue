<template>
  <q-page class="flex flex-center">
    <img alt="Purecloud Logo" src="~assets/purecloud-logo.jpg" width="320" />
  </q-page>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('app/updateTitleHeader', this.$t('welcome.title'))
  }
}
</script>
