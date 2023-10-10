<template>
  <section id="banner">
    <div class="container-fluid">
      <h1 class="banner">{{ title }}</h1>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AlertBanner',
  props: {
    title: String,
  },
};
</script>

<style scoped>
section {
  padding: 15px 0 10px 0;
  background-color: #00a100;
}

.banner {
  font-size: 3rem;
  color: white;
}

@media (max-device-width: 480px) {
  section {
    padding: 15px 0 5px 0;
    background-color: #00a100;
  }

  .banner {
    font-size: 1.2rem;
  }
}
</style>
