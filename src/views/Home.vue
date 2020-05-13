<template>
  <div class="home">
    <!-- Banner -->
    <!-- <section id="banner"> -->
    <!-- <div class="inner">
      <h2>ElectrifyMe</h2>
      <p>
        Accelerating the love of electric transport
      </p>
    </div> -->
    <!-- </section> -->
    <h1>{{ message }}</h1>
    <ul class="actions">
      <li><a href="/login" class="button large">Login</a></li>
      <li><a href="/signup" class="button large">Signup</a></li>
    </ul>
  </div>
</template>

<style></style>

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
