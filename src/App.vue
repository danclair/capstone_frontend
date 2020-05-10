<template>
  <div id="app">
    <!-- Header -->
    <header id="header" class="alt">
      <h1><a href="index.html">Spectral</a></h1>
      <nav id="nav">
        <ul>
          <li class="special">
            <a href="#menu" class="menuToggle"><span>Menu</span></a>
            <div id="menu">
              <ul>
                <li><a href="/home">Home</a></li>
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
    <!-- One -->
    <section id="one" class="wrapper style1 special">
      <div class="inner">
        <header class="major">
          <h2>
            ElectrifyMe
          </h2>
          <p>
            Accelerating the love of electric transport
            <!-- <br />
            fringilla tincidunt. Nullam dui leo Aenean mi ligula, rhoncus ullamcorper. -->
          </p>
        </header>
        <!-- <ul class="icons major">
          <li>
            <span class="icon fa-gem major style1"><span class="label">Lorem</span></span>
          </li>
          <li>
            <span class="icon fa-heart major style2"><span class="label">Ipsum</span></span>
          </li>
          <li>
            <span class="icon solid fa-code major style3"><span class="label">Dolor</span></span>
          </li>
        </ul> -->
      </div>
    </section>

    <!-- <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
      |
      <router-link to="/events">Events</router-link>
      |
      <router-link to="/events/new" v-if="jwt">New Event</router-link>
      |
      <router-link to="/signup" v-if="!jwt">Signup</router-link>
      |
      <router-link to="/login" v-if="!jwt">Login</router-link>
      |
      <router-link to="/logout" v-if="jwt">Logout</router-link>
    </div> -->
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
  background-color: black !important;
}
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
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
