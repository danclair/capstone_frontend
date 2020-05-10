<template>
  <div>
    <h1>Event Info</h1>
    <h2>{{ event.title }}</h2>
    <img :src="event.image" width="500" alt="event.title" />
    <p>Description: {{ event.description }}</p>
    <p>Location: {{ event.location }}</p>
    <p>{{ event.date }} {{ event.time }}</p>

    <a v-bind:href="`/events/${event.id}/edit`">Edit event</a>
    |
    <a href="/events">Back to all events</a>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      event: {},
    };
  },
  created: function() {
    this.showEvent();
  },
  methods: {
    showEvent: function() {
      axios.get("/api/events/" + this.$route.params.id).then(response => {
        console.log("Get one event: ", response);
        this.event = response.data;
      });
    },
  },
};
</script>
