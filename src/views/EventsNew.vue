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
      <input type="date" v-model="newEventDate" />
      Time:
      <input type="time" v-model="newEventTime" />
      Location:
      <input type="text" v-model="newEventLocation" />
      Image:
      <input type="text" v-model="newEventImage" />
      <input type="submit" value="Create" />
    </form>
    <section>
      <h4>Form</h4>
      <form method="post" action="#">
        <div class="row gtr-uniform">
          <div class="col-6 col-12-xsmall">
            <input type="text" name="demo-name" id="demo-name" value="" placeholder="Name" />
          </div>
          <div class="col-6 col-12-xsmall">
            <input type="email" name="demo-email" id="demo-email" value="" placeholder="Email" />
          </div>
          <div class="col-12">
            <select name="demo-category" id="demo-category">
              <option value="">- Category -</option>
              <option value="1">Manufacturing</option>
              <option value="1">Shipping</option>
              <option value="1">Administration</option>
              <option value="1">Human Resources</option>
            </select>
          </div>
          <div class="col-4 col-12-small">
            <input type="radio" id="demo-priority-low" name="demo-priority" checked />
            <label for="demo-priority-low">Low</label>
          </div>
          <div class="col-4 col-12-small">
            <input type="radio" id="demo-priority-normal" name="demo-priority" />
            <label for="demo-priority-normal">Normal</label>
          </div>
          <div class="col-4 col-12-small">
            <input type="radio" id="demo-priority-high" name="demo-priority" />
            <label for="demo-priority-high">High</label>
          </div>
          <div class="col-6 col-12-small">
            <input type="checkbox" id="demo-copy" name="demo-copy" />
            <label for="demo-copy">Email me a copy</label>
          </div>
          <div class="col-6 col-12-small">
            <input type="checkbox" id="demo-human" name="demo-human" checked />
            <label for="demo-human">Not a robot</label>
          </div>
          <div class="col-12">
            <textarea name="demo-message" id="demo-message" placeholder="Enter your message" rows="6"></textarea>
          </div>
          <div class="col-12">
            <ul class="actions">
              <li><input type="submit" value="Send Message" class="primary" /></li>
              <li><input type="reset" value="Reset" /></li>
            </ul>
          </div>
        </div>
      </form>
    </section>
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
