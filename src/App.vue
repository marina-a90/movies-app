<template>
  <div id="app">
    <nav-bar/>
    <h1>Movies</h1>
    <router-view/>
  </div>
</template>

<script>
import NavBar from './layout/NavBar.vue';

export default {
  name: 'app',
  components: {
    NavBar
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
