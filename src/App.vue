<template>
  <div id="app">
    <!-- Header -->
    <header id="header">
      <h2>ElectrifyMe</h2>
      <nav id="nav">
        <ul>
          <li class="special">
            <a href="#menu" class="menuToggle"><span>Menu</span></a>
            <div id="menu">
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/events">Events</a></li>
                <li v-if="jwt"><a href="/events/new">New Event</a></li>
                <li v-if="!jwt"><a href="/signup">Sign Up</a></li>
                <li v-if="!jwt"><a href="/login">Log In</a></li>
                <li v-if="jwt"><a href="/logout">Logout</a></li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </header>

    <router-view />

    <!-- Footer -->
    <footer id="footer">
      <ul class="icons">
        <li>
          <a href="#" class="icon brands fa-twitter"><span class="label">Twitter</span></a>
        </li>
        <li>
          <a href="#" class="icon brands fa-facebook-f"><span class="label">Facebook</span></a>
        </li>
        <li>
          <a href="#" class="icon brands fa-instagram"><span class="label">Instagram</span></a>
        </li>
        <li>
          <a href="#" class="icon brands fa-dribbble"><span class="label">Dribbble</span></a>
        </li>
        <li>
          <a href="#" class="icon solid fa-envelope"><span class="label">Email</span></a>
        </li>
      </ul>
      <ul class="copyright">
        <li>&copy; Untitled</li>
        <li>
          Design:
          <a href="http://html5up.net">HTML5 UP</a>
        </li>
      </ul>
    </footer>
  </div>
</template>

<style>
body {
  /* background-color: black !important; */
}
.actions {
  margin: auto;
}
ul#h-list {
  margin: auto;
}
</style>

<script>
/* global setupTheme */
export default {
  data: function() {
    return {
      jwt: null,
    };
  },
  created: function() {
    this.setJwt();
  },
  mounted: function() {
    setupTheme();
  },
  methods: {
    setJwt: function() {
      this.jwt = localStorage.jwt;
    },
  },
};
</script>
