<template>
  <div class="wrapper alt style3">
    <br />
    <br />
    <br />
    <div>
      <h1><u>All Upcoming Events</u></h1>
    </div>
    <!-- Two -->
    <section id="two" class="wrapper alt style1">
      <section class="spotlight" v-for="event in events">
        <div class="image"><img :src="event.image" alt="event.title" /></div>
        <div class="content">
          <h2>
            {{ event.title }}
          </h2>
          <p>
            <b>
              <u>{{ event.location }}</u>
            </b>
            <br />
            <i>
              <b>{{ event.date }} {{ event.time }}</b>
            </i>
            <br />
            {{ event.description }}
          </p>
          <div>
            <a :href="`/events/${event.id}`" class="button small">Show event</a>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<style>
.events-header {
  background-color: black !important;
}
</style>

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
