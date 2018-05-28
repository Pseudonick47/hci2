<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title>CS Laboratories</v-toolbar-title>
      <v-spacer/>
      <v-btn
        flat
        @click="goToSchedule"
      >Schedule</v-btn>
      <v-btn flat>Entities</v-btn>
    </v-toolbar>
    <v-content>
      <v-container
        fluid
        pa-0
        fill-height
      >
        <router-view/>
      </v-container>
    </v-content>
    <v-footer app/>
  </v-app>
</template>

<script>
import AuthController from 'Controllers/auth.controller';
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters([
      'activeUser',
      'isAdmin',
      'isLogged',
      'activeUserRole',
    ]),
  },
  methods: {
    logout() {
      AuthController.logout();
    },
    goToSchedule() {
      this.$router.push({ name: 'schedule' });
    },
  },
};
</script>
<style>
html {
  overflow: auto;
}

.application--wrap {
  height: 100%;
  min-height: 0;
}

.content {
  height: 100%;
  padding: 0 !important;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: calc(100vh - 60px);
}
</style>
