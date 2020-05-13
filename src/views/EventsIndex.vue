<template>
  <div id="demo" class="light">
    <br />
    <br />
    <br />
    <h1>All Upcoming Events</h1>
    <!-- Two -->
    <section id="two" class="wrapper alt style1">
      <section class="spotlight" v-for="event in events">
        <div class="image"><img :src="event.image" alt="event.title" /></div>
        <div class="content">
          <h2>
            {{ event.title }}
          </h2>
          <p>
            {{ event.description }}
            <br />
            {{ event.date }} {{ event.time }}
          </p>
          <div>
            <a v-bind:href="`/events/${event.id}`" class="">Show event</a>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      newEventId: "",
      newEventRole: "",
      eventuser: {},
      events: [],
    };
  },
  created: function() {
    axios.get("/api/events").then(response => {
      this.events = response.data;
      console.log(this.events);
    });
  },
  methods: {},
};
</script>
