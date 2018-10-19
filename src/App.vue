<template>
  <div id="app">
    <navbar></navbar>

    <div id="wrapper">
      <toolbar id="toolbar"></toolbar>

      <router-view id="content"></router-view>
    </div>
  </div>
</template>

<script>
import navbar from './components/Navbar'
import toolbar from './components/Toolbar'

export default {
  name: 'App',
  components: {
    toolbar,
    navbar
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow-x: hidden;
}

#wrapper {
  width: 100vw;
  overflow: hidden;
  padding: 10px;
}
#toolbar {
  float: left;
  width: 15vw;
  min-width: 125px; /* Need Media Query for device < 768px width*/
}
#content {
  margin: 25px 25px 25px 17vw;
}
</style>
