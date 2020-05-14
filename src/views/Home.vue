<template>
  <div class="wrapper alt style3">
    <!-- Banner -->
    <section id="banner" class="home-banner">
      <div class="inner">
        <h2>ElectrifyMe</h2>
        <p>
          Accelerating the love of electric transport
        </p>
      </div>
      <br />
      <br />
      <section id="two" class="wrapper alt style3">
        <ul id="h-list" class="actions">
          <li><a href="/login" class="button primary large">Login</a></li>
          <li><a href="/signup" class="button primary large">Signup</a></li>
        </ul>
      </section>
      <span class="image fit"><img src="images/banner2.jpg" alt="" width="fit" /></span>
    </section>
  </div>
</template>

<style>
.home-banner {
  background-image: public/images/pic02.jpg;
}
#two {
  margin: 0 auto;
}
</style>

<script>
export default {
  data: function() {
    return {
      message: "Welcome to ElectrifyMe!",
    };
  },
  created: function() {},
  methods: {},
};
</script>
