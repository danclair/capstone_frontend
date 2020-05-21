<template>
  <section class="wrapper style1">
    <div class="inner">
      <h1>New Event</h1>
      <form v-on:submit.prevent="createEvent()">
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
        <input type="text" name="demo-name" id="demo-name" v-model="newEventTitle" placeholder="Event Name" />
        <br />
        <textarea
          type="text"
          name="demo-message"
          id="demo-message"
          rows="3"
          v-model="newEventDescription"
          placeholder="Description"
        ></textarea>
        <br />
        <div class="row gtr-uniform">
          <div class="col-6 col-12-xsmall">
            <date-picker
              name="demo-date"
              id="demo-date"
              v-model="newEventDate"
              valueType="format"
              placeholder="Select Date"
            ></date-picker>
          </div>
          <div class="col-6 col-12-xsmall">
            <date-picker v-model="newEventTime" type="time" placeholder="Select time"></date-picker>
          </div>
        </div>
        <br />
        <input type="text" v-model="newEventLocation" placeholder="Location" />
        <br />
        Image:
        <input type="file" v-on:change="setFile($event)" ref="fileInput" />
        <br />
        <ul class="actions">
          <li><input type="submit" value="Create Event" class="primary" /></li>
          <li><input type="reset" value="Reset" /></li>
        </ul>
      </form>
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
      // newEventImage: "",
      image: "",
      errors: [],
    };
  },
  created: function() {},
  methods: {
    setFile: function(event) {
      if (event.target.files.length > 0) {
        this.image = event.target.files[0];
      }
    },
    createEvent: function() {
      var formData = new FormData();
      formData.append("title", this.newEventTitle);
      formData.append("description", this.newEventDescription);
      formData.append("date", this.newEventDate);
      formData.append("time", this.newEventTime);
      formData.append("location", this.newEventLocation);
      formData.append("image", this.image);

      // var params = {
      //   title: this.newEventTitle,
      //   description: this.newEventDescription,
      //   date: this.newEventDate,
      //   time: this.newEventTime,
      //   location: this.newEventLocation,
      //   image: this.newEventImage,
      // };
      axios
        .post("/api/events", formData)
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
