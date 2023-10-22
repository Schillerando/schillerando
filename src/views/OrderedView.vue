<template>
  <div class="wrapper">
    <div class="center">
      <img src="../assets/green_circle_check.png" alt="" />

      <h4>Vielen Dank für deine Bestellung!</h4>

      <h6>
        In deinem Account findest du eine Übersicht zu deiner Bestellung und
        kannst ihren Status verfolgen.
      </h6>

      <h6>
        Du findest dort außerdem einen QR-Code, den du bei Erhalt der Bestellung
        dem Lieferboten vorzeigen musst.
      </h6>

      <a href="/account" class="btn btn-primary">Zum Account</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderedView',
};
</script>

<style scoped>
.wrapper {
  display: table;
  width: 100%;
  height: 75vh;
}

.center {
  padding: 0 30px 0 30px;
  display: table-cell;
  vertical-align: middle;
}

img {
  max-width: 40%;
  max-height: 20vh;
  margin-bottom: 30px;
}

h4 {
  margin-bottom: 30px;
}

h6 {
  margin-bottom: 20px;
}

a {
  margin-top: 20px;
}
</style>
