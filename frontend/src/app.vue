<template>
  <v-app>
    <alert-box v-if="showAlert"/>
    <v-toolbar app>
      <v-toolbar-title>CS Laboratories</v-toolbar-title>
      <v-spacer/>
      <v-btn
        flat
        @click="goToSchedule"
      >Schedule</v-btn>
      <v-btn
        flat
        @click="goToEntities">Entities</v-btn>
    </v-toolbar>
    <v-content>
      <v-container
        px-0
        pt-1
        style="min-height: 100%;"
      >
        <router-view/>
      </v-container>
    </v-content>
    <v-footer app/>
    <help/>
  </v-app>
</template>

<script>
import Help from 'Components/help/help-snackbar.component';
import AuthController from 'Controllers/auth.controller';
import AlertBox from 'Components/helpers/AlertHelper.component';
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
    };
  },
  components: {
    'alert-box': AlertBox,
    Help,
  },
  computed: {
    ...mapGetters([
      'activeUser',
      'isAdmin',
      'isLogged',
      'activeUserRole',
      'showAlert',
    ]),
  },
  methods: {
    logout() {
      AuthController.logout();
    },
    goToSchedule() {
      this.$router.push({ name: 'schedule' });
    },
    goToEntities() {
      this.$router.push({ name: 'entities' });
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
  color: #2c3e50;
  margin-top: 60px;
  height: calc(100vh - 60px);
}
</style>
