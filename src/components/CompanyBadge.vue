<template>
  <a
    v-if="verified || premium"
    tabindex="0"
    role="button"
    data-bs-toggle="popover"
    data-bs-trigger="focus"
    data-bs-placement="left"
    :data-bs-content="[
      self
        ? 'Das sind wir!'
        : premium
        ? 'Schillerando Premium-Partner'
        : 'Verifizierter Schillerando-Partner',
    ]"
  >
    <div class="container_row">
      <i
        class="layer1 fa-solid fa-certificate fa-xl"
        :style="{ color: [self ? '#00a100' : premium ? '#f6b600' : '#3798f0'] }"
      ></i>
      <i v-if="self" class="layer2 fa-solid fa-house fa-xs"></i>
      <i v-else-if="premium" class="layer2 fa-solid fa-crown fa-xs"></i>
      <i v-else class="layer2 fa-solid fa-check fa-sm"></i>
    </div>
  </a>
</template>

<script>
import { Popover } from 'bootstrap/dist/js/bootstrap.bundle.js';

export default {
  name: 'CompanyBadge',
  props: {
    verified: Boolean,
    premium: Boolean,
    self: Boolean,
  },
  mounted() {
    Array.from(
      document.querySelectorAll('a[data-bs-toggle="popover"]')
    ).forEach((popoverNode) => new Popover(popoverNode, { html: true }));
  },
};
</script>

<style scoped>
.container_row {
  display: grid;
  height: 25px;
}

.layer1,
.layer2 {
  grid-column: 1;
  grid-row: 1;
  position: relative;
  margin: auto;
}

.layer2 {
  color: #ffffff;
}

.fa-house {
  position: relative;
  bottom: 1px;
}
</style>
