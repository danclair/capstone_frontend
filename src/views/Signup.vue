<template>
  <div class="wrapper style1">
    <div class="container">
      <form v-on:submit.prevent="submit()">
        <h1>Signup</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <input type="text" class="form-control" v-model="first_name" placeholder="First Name" autofocus />
        </div>
        <div class="form-group">
          <input type="text" class="form-control" v-model="last_name" placeholder="Last Name" />
        </div>
        <div class="form-group">
          <input type="email" class="form-control" v-model="email" placeholder="Email" />
        </div>
        <div class="form-group">
          <input type="password" class="form-control" v-model="password" placeholder="Password" />
        </div>
        <div class="form-group">
          <input type="password" class="form-control" v-model="passwordConfirmation" placeholder="Confirm Password" />
        </div>
        <input type="submit" class="primary" value="Submit" />
      </form>
      <p>
        Already have an account?
        <a href="/login">Login here</a>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: [],
    };
  },
  methods: {
    submit: function() {
      var params = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
      };
      axios
        .post("/api/users", params)
        .then(response => {
          this.$router.push("/login");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
