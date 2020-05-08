<template>
  <div class="events-index">
    <h1>All Upcoming Events</h1>
    Search:
    <input type="text" v-model="filterText" list="titles" />
    <datalist id="events">
      <option v-for="event in events">{{ event.title }}</option>
    </datalist>
    <div
      v-for="event in filterBy(events, filterText, 'title', 'description')"
      class="card"
      style="width: 18rem;"
      v-bind:class="{ selected: event === currentEvent }"
    >
      <h2>{{ event.title }}</h2>
      <p>{{ event.description }}</p>
      <img v-bind:src="event.image" class="card-img-top" v-bind:alt="event.title" />
      <small>Created at {{ relativeDate(event.created_at) }}</small>
      <div>
        <a v-bind:href="`/events/${event.id}`" class="btn btn-link">Show event</a>
      </div>
      <small></small>
    </div>
    <!-- <div v-for="event in events">
      <h2>{{ event.title }}</h2>
    </div> -->
  </div>
</template>

<style>
.selected {
  color: white;
  background-color: steelBlue;
  transition: background-color 1s ease;
}
</style>

<script>
import axios from "axios";
import moment from "moment";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      message: "Welcome to Vue.js!",
      events: [],
      filterText: "",
    };
  },
  created: function() {
    axios.get("/api/events").then(response => {
      this.events = response.data;
    });
  },
  methods: {
    relativeDate: function(date) {
      return moment(date).fromNow();
    },
  },
};
</script>
