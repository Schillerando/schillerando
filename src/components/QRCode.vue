<template>
  <VueQrcode id="qrblock" ref="qrcode" :value="link" :scale="scale" />

  <div v-if="download">
    <button class="btn btn-primary">Download</button>
  </div>
</template>

<script>
import VueQrcode from 'vue-qrcode';

export default {
  name: 'QRCode',
  props: ['link', 'scale', 'download'],
  components: {
    VueQrcode,
  },
  methods: {
    downloadQRCode(href) {
      const img = document.createElement('img');
      img.scr = href;
    },
  },
};
</script>
