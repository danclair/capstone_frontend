<template>
  <div class="wrapper alt style3">
    <!-- Banner -->
    <section id="banner" class>
      <img src="/public/images/banner1.jpg" alt="" />
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
    </section>
  </div>
</template>

<style>
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
