<template>
  <section id="title">
    <div class="container-fluid">
      <h1 class="title">{{ title }}</h1>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TitleDiv',
  props: {
    title: String,
  },
};
</script>

<style scoped>
section {
  padding: 40px 0 30px 0;
  background-color: #fff;
}

.title {
  font-size: 4rem;
  color: #00a100;
  padding: 0 20px;
}

@media (max-device-width: 480px) {
  section {
    padding: 30px 0 20px 0;
    background-color: #fff;
  }

  .title {
    font-size: 2.5rem;
    padding: 0;
  }
}
</style>
