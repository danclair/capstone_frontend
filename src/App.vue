<template>
  <div id="app">
    <!-- Header -->
    <header id="header" class="inner">
      <h2>ElectrifyMe</h2>
      <nav id="nav">
        <ul>
          <li class="special">
            <a href="#menu" class="menuToggle"><span>Menu</span></a>
            <div id="menu" class="wrapper style4">
              <ul>
                <li><a href="/home" class="icon solid fa-home"> Home Base</a></li>
                <li><a href="/events" class="icon solid fa-calendar"> Events</a></li>
                <li v-if="jwt"><a href="/events/new" class="icon fa-calendar-plus"> New Event</a></li>
                <li v-if="jwt"><a href="/eventsnearme" class="icon fa-map"> Events Near Me</a></li>
                <li v-if="!jwt"><a href="/signup" class="icon solid fa-user-plus"> Sign Up</a></li>
                <li v-if="!jwt"><a href="/login" class="icon solid fa-arrow-right"> Log In</a></li>
                <li v-if="jwt"><a href="/logout" class="icon solid fa-arrow-left" aria-hidden="true"> Logout</a></li>
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
          <a href="#" class="icon solid fa-home"><span class="label">Twitter</span></a>
        </li>
        <li>
          <a href="#" class="icon solid fa-car"><span class="label">Facebook</span></a>
        </li>
        <li>
          <a href="#" class="icon solid fa-calendar-check"><span class="label">Instagram</span></a>
        </li>
        <li>
          <a href="#" class="icon solid fa-edit"><span class="label">Dribbble</span></a>
        </li>
      </ul>
      <ul class="copyright">
        <li>&copy; ElectrifyMe</li>
        <li>
          Design:
          <a href="http://html5up.net">HTML5 UP</a>
        </li>
      </ul>
    </footer>
  </div>
</template>

<style>
#menu {
  /* background-color: #2e3842; */
  backdrop-filter: drop-shadow(100px);
}
.actions {
  margin: auto;
}
.welcome {
  text-align: center;
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
