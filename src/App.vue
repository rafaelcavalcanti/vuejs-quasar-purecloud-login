<template>
  <div id="q-app">
    <transition
      name="transitions"
      enter-active-class="animated slideInUp"
      leave-active-class="animated fadeOut"
      mode="out-in"
    >
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
