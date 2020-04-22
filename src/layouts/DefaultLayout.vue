<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-primary text-white">
        <q-btn flat round dense icon="mdi-menu" @click="showSettings = !showSettings" />
        <q-toolbar-title>{{ getTitleHeader }}</q-toolbar-title>

        <!-- profile menu -->
        <q-btn icon="mdi-dots-vertical" flat round>
          <q-menu style="max-width: 350px">
            <q-list padding>
              <q-item-label header>{{ getUserName }}</q-item-label>
              <q-separator />
              <q-item clickable v-close-popup :to="{ name: 'oauth.logout' }">
                <q-item-section>{{ $t('oauth.logout') }}</q-item-section>
                <q-item-section avatar>
                  <q-icon color="negative" name="mdi-run" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <!-- end profile menu -->
      </q-toolbar>
    </q-header>

    <!-- side menu -->
    <q-drawer v-model="showSettings" bordered content-class="bg-grey-1">
      <div class="q-pt-md row justify-center">
        <q-avatar size="150px">
          <img
            src="https://avatars0.githubusercontent.com/u/12388?s=460&u=938c7d439f706188494f3ef76db8c8e82503e6cb&v=4"
          />
        </q-avatar>
      </div>
      <div class="row justify-center">
        <p class="q-my-xs">Rafael Cavalcanti</p>
      </div>
      <div class="row justify-center q-gutter-sm q-pb-md">
        <q-btn
          round
          color="primary"
          text-color="white"
          icon="mdi-linkedin"
          type="a"
          target="_blank"
          href="https://www.linkedin.com/in/rafaelcavalcanti"
        />
        <q-btn
          round
          color="grey"
          text-color="white"
          icon="mdi-github"
          type="a"
          target="_blank"
          href="https://github.com/rafaelcavalcanti"
        />
      </div>
      <q-list padding class="text-primary">
        <q-item
          clickable
          v-ripple
          :active="this.$route.name == 'welcome'"
          exact-active-class="bg-teal-1 text-grey-8"
          :to="{ name: 'welcome' }"
        >
          <q-item-section avatar>
            <q-icon name="mdi-home-outline" />
          </q-item-section>
          <q-item-section>{{ $t('welcome.title') }}</q-item-section>
        </q-item>
        <q-item-label header class="text-grey-8">{{ $t('reports') }}</q-item-label>
        <q-item
          clickable
          v-ripple
          :active="this.$route.name == 'routing.queues'"
          exact-active-class="bg-teal-1 text-grey-8"
          :to="{ name: 'routing.queues' }"
        >
          <q-item-section avatar>
            <q-icon name="mdi-sync" />
          </q-item-section>
          <q-item-section>{{ $t('queues.title') }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <!-- end side menu -->

    <q-page-container>
      <transition name="fade">
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  computed: {
    ...mapGetters('app', ['getTitleHeader']),
    ...mapState('app', ['show_menu_settings']),
    ...mapGetters('user', ['getUserName']),
    showSettings: {
      get() {
        return this.show_menu_settings
      },
      set(value) {
        this.showMenuSettings(value)
      }
    }
  },
  methods: {
    ...mapActions('app', ['showMenuSettings'])
  }
}
</script>

<style scope>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
