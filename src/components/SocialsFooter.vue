<template>
  <footer id="footer" class="container-fluid">
    <div class="container-fluid">
      <a href="mailto:info@schillerando.de">
        <i class="social-icon fa-solid fa-lg fa-envelope"></i>
      </a>
      <a
        tabindex="0"
        role="button"
        data-bs-toggle="popover"
        data-bs-trigger="focus"
        data-bs-placement="top"
        data-bs-content='
      <div>
        <p>
          Hierbei handelt es sich um ein Unternehmen für das Schulprojekt Schule als Staat 2023 des FSG Marbach und um kein echtes Unternehmen 
        </p>
        <p>
          <strong>Impressum:</strong>
          <br>Felix Haag
          <br>Schulstraße 34
          <br>71672 Marbach am Neckar
          <br>Telefon: <a href="tel:+4915759664764">0157 / 59 66 47 64</a>
          <br>E-Mail: <a href="mailto:info@schillerando.de">info@schillerando.de</a>
        </p>
      </div>'
      >
        <i class="social-icon fa-solid fa-lg fa-circle-info"></i>
      </a>

      <a href="https://www.instagram.com/schillerando/">
        <i class="social-icon fab fa-lg fa-instagram"></i>
      </a>
      <p>© Schillerando</p>
    </div>
  </footer>
</template>

<script>
import { Popover } from 'bootstrap/dist/js/bootstrap.bundle.js';

export default {
  name: 'ProductView',
  mounted() {
    Array.from(
      document.querySelectorAll('a[data-bs-toggle="popover"]')
    ).forEach((popoverNode) => new Popover(popoverNode, { html: true }));
  },
};
</script>

<style scoped>
footer {
  padding-bottom: 50px;
  padding-top: 50px;
}

.social-icon {
  margin: 30px 20px;
}

a:hover {
  color: black;
}
</style>
