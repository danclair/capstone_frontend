<template>
  <div class="container">
    <h1>Edit Event</h1>
    <form v-on:submit.prevent="updateEvent(event)">
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
      Title:
      <input type="text" v-model="event.title" />
      Description:
      <input type="text" v-model="event.description" />
      Date:
      <input type="text" v-model="event.date" />
      Time:
      <input type="text" v-model="event.time" />
      Location:
      <input type="text" v-model="event.location" />
      Image:
      <input type="text" v-model="event.image" />
      <input type="submit" value="Update" />
    </form>
    <button v-on:click="destroyEvent(event)">Destroy Event</button>
    <a :href="`/events/${event.id}`">Cancel edit</a>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      event: {},
      errors: [],
    };
  },
  created: function() {
    axios.get("/api/events/" + this.$route.params.id).then(response => {
      this.event = response.data;
    });
  },
  methods: {
    updateEvent: function(event) {
      var params = {
        title: event.title,
        description: event.description,
        date: event.date,
        time: event.time,
        location: event.location,
        image: event.image,
      };
      axios
        .patch("/api/events/" + event.id, params)
        .then(response => {
          this.$router.push("/events");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    destroyEvent: function(event) {
      axios.delete("/api/events/" + this.$route.params.id).then(response => {
        this.$router.push("/events");
      });
    },
  },
};
</script>
