<template>
  <div class="container">
    <h1>New Event</h1>
    <form v-on:submit.prevent="createEvent()">
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
      Event:
      <input type="text" v-model="newEventTitle" />
      Description:
      <input type="text" v-model="newEventDescription" />
      Date:
      <input type="text" v-model="newEventDate" />
      Time:
      <input type="text" v-model="newEventTime" />
      Location:
      <input type="text" v-model="newEventLocation" />
      Image:
      <input type="text" v-model="newEventImage" />
      <input type="submit" value="Create" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      newEventTitle: "",
      newEventDescription: "",
      newEventDate: "",
      newEventTime: "",
      newEventLocation: "",
      newEventImage: "",
      errors: [],
    };
  },
  created: function() {},
  methods: {
    createEvent: function() {
      var params = {
        title: this.newEventTitle,
        description: this.newEventDescription,
        date: this.newEventDate,
        time: this.newEventTime,
        location: this.newEventLocation,
        image: this.newEventImage,
      };
      axios
        .post("/api/events", params)
        .then(response => {
          this.$router.push("/events");
        })
        .catch(error => {
          console.log(error.response);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
