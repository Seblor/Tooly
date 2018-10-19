<template>
  <b-navbar toggleable="md" type="dark" variant="info" id="navbar">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#">Tooly</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <router-link v-bind:to="'/'">
          <b-nav-item href="javascript:void()" :active="$route.fullPath === '/'">Home</b-nav-item>
        </router-link>
        <router-link v-bind:to="'/about'">
          <b-nav-item href="javascript:void()" :active="$route.fullPath === '/about'">About</b-nav-item>
        </router-link>
      </b-navbar-nav>

      <!-- <b-navbar-nav class="ml-auto">

        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search" />
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>

        <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          <template slot="button-content">
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Signout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav> -->

    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
    }
  },
  methods: {
    isRoute: function (route) {
      console.log({ route, result: window.location.pathname === route })
      return window.location.pathname === route
    }
  },
  computed: {
    getRoute: function () {
      return window.location.pathname
    }
  }
}
</script>

<style scoped>
#navbar {
  position: sticky;
}
</style>
