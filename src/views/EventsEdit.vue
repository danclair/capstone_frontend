<template>
  <section class="wrapper style1">
    <div class="inner">
      <h1>Edit Event</h1>
      <form v-on:submit.prevent="updateEvent(event)">
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
        Title:
        <input type="text" name="demo-name" id="demo-name" v-model="newEventTitle" :placeholder="`${event.title}`" />
        <br />
        Description:
        <textarea
          type="text"
          name="demo-message"
          id="demo-message"
          rows="3"
          v-model="newEventDescription"
          :placeholder="`${event.description}`"
          >{{ event.description }}</textarea
        >
        <br />
        <!-- <input type="text" v-model="event.date" /> -->
        <div class="row gtr-uniform">
          <div class="col-6 col-12-xsmall">
            Date:
            <date-picker
              name="demo-date"
              id="demo-date"
              v-model="newEventDate"
              valueType="format"
              :placeholder="`${event.date}`"
            ></date-picker>
          </div>
          <!-- <input type="text" v-model="event.time" /> -->
          <div class="col-6 col-12-xsmall">
            Time:
            <date-picker v-model="newEventTime" type="time" :placeholder="`${event.time}`"></date-picker>
          </div>
        </div>
        <br />
        Location:
        <input type="text" v-model="newEventLocation" :placeholder="`${event.location}`" />
        <br />
        <p>
          Current Image:
          <img :src="event.image" width="300" alt="event.title" />
        </p>
        Choose New Image:
        <input type="file" v-on:change="setFile($event)" ref="fileInput" :placeholder="`${event.image}`" />
        <br />
        <input type="submit" value="Update Event" class="button primary" />
      </form>
      <br />
      <button v-on:click="destroyEvent(event)" class="button">Destroy Event</button>
      <a :href="`/events/${event.id}`">Cancel edit</a>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  components: { DatePicker },
  data: function() {
    return {
      newEventTitle: "",
      newEventDescription: "",
      newEventDate: "",
      newEventTime: "",
      newEventLocation: "",
      image: "",
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
    setFile: function(event) {
      if (event.target.files.length > 0) {
        this.image = event.target.files[0];
      }
    },
    updateEvent: function(event) {
      var formData = new FormData();
      formData.set("title", this.newEventTitle);
      formData.set("description", this.newEventDescription);
      formData.set("date", this.newEventDate);
      formData.set("time", this.newEventTime);
      formData.set("location", this.newEventLocation);
      formData.set("image", this.image);
      // var params = {
      //   title: event.title,
      //   description: event.description,
      //   date: event.date,
      //   time: event.time,
      //   location: event.location,
      //   image: event.image,
      // };
      axios
        .patch("/api/events/" + event.id, formData)
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
