<template>
  <div class="wrapper alt style1">
    <!-- Banner -->
    <section id="banner">
      <div class="home-banner" id="banner">
        <div class="inner">
          <h2>ElectrifyMe</h2>
          <p>
            Accelerating the love of electric transport
          </p>
        </div>
        <section id="two">
          <ul id="h-list" class="actions">
            <li><a href="/login" class="button primary large">Login</a></li>
            <li><a href="/signup" class="button primary large">Signup</a></li>
          </ul>
        </section>
      </div>
      <br />
      <br />
    </section>
  </div>
</template>

<style>
.home-banner {
  background-image: url("/images/banner1.jpg");
  background-size: cover;
}
#two {
  margin: 0 auto;
}
</style>

<script>
export default {
  data: function() {
    return {
      json: console.log("Welcome to ElectrifyMe!"),
    };
  },
  created: function() {},
  methods: {},
};
</script>
