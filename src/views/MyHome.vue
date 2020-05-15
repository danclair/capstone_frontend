<template>
  <section id="three" class="wrapper style3 special">
    <div class="inner">
      <header class="major">
        <h2>Accumsan mus tortor nunc aliquet</h2>
        <p>
          Aliquam ut ex ut augue consectetur interdum. Donec amet imperdiet eleifend
          <br />
          fringilla tincidunt. Nullam dui leo Aenean mi ligula, rhoncus ullamcorper.
        </p>
      </header>
      <ul class="features">
        <li class="icon solid fa-car">
          <div v-for="vehicle in vehicles">
            <h3>{{ vehicle.nickname }}</h3>
            <p>
              Augue consectetur sed interdum imperdiet et ipsum. Mauris lorem tincidunt nullam amet leo Aenean ligula
              consequat consequat.
            </p>
          </div>
        </li>

        <li class="icon fa-calendar-check">
          <h3>My Events</h3>
          <p>
            Augue consectetur sed interdum imperdiet et ipsum. Mauris lorem tincidunt nullam amet leo Aenean ligula
            consequat consequat.
          </p>
        </li>
        <!-- <li class="icon solid fa-laptop">
          <h3>Ac Augue Eget</h3>
          <p>
            Augue consectetur sed interdum imperdiet et ipsum. Mauris lorem tincidunt nullam amet leo Aenean ligula
            consequat consequat.
          </p>
        </li>
        <li class="icon solid fa-code">
          <h3>Mus Scelerisque</h3>
          <p>
            Augue consectetur sed interdum imperdiet et ipsum. Mauris lorem tincidunt nullam amet leo Aenean ligula
            consequat consequat.
          </p>
        </li>
        <li class="icon solid fa-headphones-alt">
          <h3>Mauris Imperdiet</h3>
          <p>
            Augue consectetur sed interdum imperdiet et ipsum. Mauris lorem tincidunt nullam amet leo Aenean ligula
            consequat consequat.
          </p>
        </li>
        <li class="icon fa-heart">
          <h3>Aenean Primis</h3>
          <p>
            Augue consectetur sed interdum imperdiet et ipsum. Mauris lorem tincidunt nullam amet leo Aenean ligula
            consequat consequat.
          </p>
        </li>
        <li class="icon fa-flag">
          <h3>Tortor Ut</h3>
          <p>
            Augue consectetur sed interdum imperdiet et ipsum. Mauris lorem tincidunt nullam amet leo Aenean ligula
            consequat consequat.
          </p>
        </li> -->
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
      vehicles: {},
      events: [],
    };
  },
  created: function() {},
  mounted: function() {
    this.showVehicles();
  },
  methods: {
    showVehicles: function() {
      // NO IDEA HOW TO GET CURRENT USER'S VEHICLES IN HERE
      axios.get("/api/vehicles/0?user_id=" + current_user.id).then(response => {
        console.log("Get one vehicle: ", response);
        this.vehicles = response.data;
      });
    },
  },
};
</script>
