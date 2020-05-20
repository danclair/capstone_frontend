<template>
  <section id="three" class="wrapper style3 special">
    <div class="inner">
      <header class="major">
        <h2>{{ vehicles[0].user }}'s Home Base</h2>
        <br />
        <a href="/events" class="large button">All Events</a>
        <a href="/eventsnearme" class="large button">Events Near Me</a>
      </header>
      <ul class="features">
        <li class="icon solid fa-car">
          <h2><u>My Vehicles</u></h2>
          <div v-for="vehicle in vehicles">
            <h3>"{{ vehicle.nickname }}"</h3>
            <h4>{{ vehicle.year }} {{ vehicle.make.manufacturer }} {{ vehicle.vehicle_model.name }}</h4>
            <h5>{{ vehicle.trim.name }}</h5>
            <h6>{{ vehicle.color }}</h6>
            <img :src="`${vehicle.image}`" width="300" />
            <br />
            <br />
            <br />
          </div>
        </li>

        <li class="icon fa-calendar-check">
          <h2><u>My Events</u></h2>
          <div v-for="event_user in event_users">
            <h3>{{ event_user.event.title }}</h3>
            <p>{{ event_user.date }} | {{ event_user.time }}</p>
            <p>{{ event_user.event.location }}</p>
            <img :src="`${event_user.event.image}`" width="200" />
            <br />

            <a :href="`/events/${event_user.event.id}`" class="button small">Show event</a>
            <br />
            <br />
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      newEventId: "",
      newEventRole: "",
      vehicles: [],
      events: [],
      event_users: [],
      users: [],
    };
  },
  created: function() {},
  mounted: function() {
    this.showVehicles();
    this.showMyEvents();
  },
  methods: {
    showVehicles: function() {
      axios.get("/api/vehicles?owner=true").then(response => {
        console.log("Get one vehicle: ", response);
        this.vehicles = response.data;
      });
    },
    showMyEvents: function() {
      axios.get("/api/event_users/").then(response => {
        console.log("Get my events", response);
        this.event_users = response.data;
      });
    },
  },
};
</script>
