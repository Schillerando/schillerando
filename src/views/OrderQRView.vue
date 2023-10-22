<template>
  <div v-if="this.link != null" class="code">
    <QRCode :link="link" :scale="4" :download="false" />
  </div>

  <p>Zeige diesen QR Code bei Erhalt deiner Bestellung dem Lieferboten vor.</p>
</template>

<script>
import QRCode from '../components/QRCode.vue';
import { useStore } from 'vuex';

export default {
  name: 'OrderQRView',
  components: {
    QRCode,
  },
  data() {
    return {
      link: null,
    };
  },
  setup() {
    const store = useStore();

    return {
      store,
    };
  },
  mounted() {
    this.link =
      process.env.VUE_APP_INTERN_URL +
      '/orders/' +
      this.$route.params.orderid +
      '/confirm?user_id=' +
      this.store.state.user.id;
  },
};
</script>

<style scoped>
p {
  margin: 40px 20px;
}

.code {
  margin-top: 50px;
}
</style>
