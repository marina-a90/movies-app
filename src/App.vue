<template>
  <div id="app">
    <navbar/>
    <h1>Movies</h1>
    <router-view/>
  </div>
</template>

<script>
import navbar from './layout/navbar.vue';
import AppMovies from './components/AppMovies.vue';

export default {
  name: 'app',
  components: {
    navbar, 
    AppMovies
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
