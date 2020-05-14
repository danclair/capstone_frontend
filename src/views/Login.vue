<template>
  <div class="wrapper style1">
    <div class="container">
      <form v-on:submit.prevent="submit()">
        <h1>Login</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <input autofocus type="email" class="form-control" v-model="email" placeholder="Email" />
        </div>
        <div class="form-group">
          <input type="password" class="form-control" v-model="password" placeholder="Password" />
        </div>
        <input type="submit" class="button primary" value="Submit" />
      </form>
      <p>
        No account?
        <a href="/signup">Sign up here</a>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      email: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("/api/sessions", params)
        .then(response => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          this.$parent.setJwt();
          this.$router.push("/events");
        })
        .catch(error => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>
