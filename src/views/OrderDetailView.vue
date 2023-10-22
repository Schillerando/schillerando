<template>
  <div class="container" v-if="!loading">
    <h1>Bestellung</h1>

    <div class="details">
      <div class="order_info">
        <i class="fa-solid fa-calendar"></i>
        <span>{{ this.day }}</span>

        <div class="order_time">
          <i class="fa-solid fa-clock"></i>
          <span>{{ this.order_time }}</span>
        </div>
      </div>

      <div class="delivery_info">
        <div>
          <span v-if="this.order.driver == null" class="badge text-bg-warning"
            >In Bearbeitung</span
          >
          <span
            v-else-if="this.delivery_time == null"
            class="badge text-bg-success"
            >In Zulieferung</span
          >
          <span v-else class="badge text-bg-secondary">Geliefert</span>
        </div>

        <div class="delivery_time">
          <div v-if="this.delivery_time != null && this.delivery_time != ''">
            <i class="fa-solid fa-truck"></i>
            {{ this.delivery_time }}
          </div>
        </div>
      </div>
    </div>

    <button
      v-if="this.order.delivery_time == null"
      @click="$router.push(qrLink)"
      class="btn btn-primary btn-sm"
    >
      <i class="fa-solid fa-qrcode fa-xl"></i>
      <span class="qr">QR Code</span>
    </button>

    <div v-if="products.length > 0" class="list">
      <div v-for="product in products" v-bind:key="product.id">
        <ShoppingCartTile :data="product" :editable="false" />
      </div>
    </div>

    <p class="total">
      Gesamtbetrag: <span class="price">{{ order.order_price }} $</span>
    </p>

    <form class="mx-3">
      <div class="input-group mb-3">
        <span class="input-group-text"
          ><i class="fa-solid fa-location-dot"></i
        ></span>
        <textarea
          type="text"
          id="order-location"
          class="form-control"
          placeholder="Genaue Beschreibung des Lieferortes"
          required
          maxlength="200"
          style="resize: none"
          rows="3"
          cols="50"
          disabled
          :value="order.deliver_to"
        ></textarea>
      </div>

      <div class="input-group mb-4">
        <span class="input-group-text"
          ><i class="fa-solid fa-circle-info"></i
        ></span>
        <textarea
          type="text"
          id="order-note"
          class="form-control"
          placeholder="Anmerkungen zur Lieferung (Sonderwünsche etc.)"
          required
          disabled
          maxlength="300"
          style="resize: none"
          rows="6"
          cols="50"
          :value="order.note"
        ></textarea>
      </div>
    </form>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import ShoppingCartTile from '../components/ShoppingCartTile.vue';
import { supabase } from '@/supabase';
import { cutSecondsFromTime, reformatDate } from '@/helpers';

export default {
  name: 'OrderDetailView',
  components: {
    ShoppingCartTile,
  },
  data() {
    return {
      day: '',
      order_time: '',
      delivery_time: '',
      products: [],
      order: null,
      loading: true,
    };
  },
  setup() {
    const store = useStore();

    const userData = computed(() => store.state.user);

    return {
      store,
      userData,
    };
  },
  computed: {
    qrLink() {
      if (this.order == null) return '';
      return `${this.order.id}/qr`;
    },
  },
  async mounted() {
    try {
      {
        const { data, error } = await supabase
          .from('orders')
          .select()
          .eq('id', this.$route.params.orderid);

        if (error) throw error;

        this.order = data[0];
      }

      this.day = reformatDate(this.order.day);
      this.order_time = cutSecondsFromTime(this.order.order_time);
      this.delivery_time = cutSecondsFromTime(this.order.delivery_time);

      const stackedProductIds = [];
      this.order.products.forEach((productId) => {
        var index = stackedProductIds.findIndex(
          (product) => product.id == productId
        );

        if (index == -1) stackedProductIds.push({ id: productId, count: 1 });
        else stackedProductIds[index].count++;
      });

      stackedProductIds.forEach(async (p) => {
        const { data, error } = await supabase
          .from('products')
          .select()
          .eq('id', p.id);

        if (error != null) throw error;

        var product = data[0];
        product.count = p.count;

        this.products.push(product);
      });
    } catch (e) {
      console.log(e);
    }

    this.loading = false;
  },
};
</script>

<style scoped>
h1 {
  margin: 30px 0 30px 10px;
}

form {
  margin-bottom: 100px;
}

.container {
  text-align: left;
}

.list {
  margin: 0 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
}

.total {
  font-weight: 700;
  font-size: 1.4rem;
  margin: 10px 0 40px 20px;
}

.price {
  font-weight: 500;
}

.input-group-text {
  width: 40px;
}

.fa-location-dot {
  position: relative;
  left: 2px;
}

.fa-solid {
  margin-right: 10px;
  margin-bottom: 10px;
}

.delivery_info {
  float: right;
}

.delivery_time {
  margin-top: 6px;
  font-size: 1.1rem;
}

.order_info {
  float: left;
  font-size: 1.1rem;
}

.badge {
  position: relative;
  bottom: 3px;
  font-size: 1rem;
}

.btn-primary {
  background-color: #00a100;
  border-color: #00a100;
  padding: 4px 10px 5px 10px;
  margin: 10px 0 20px 10px;
}

.btn-primary:hover {
  background-color: #007400;
  border-color: #007400;
}

.fa-qrcode {
  margin: 0;
}

.qr {
  font-size: 1.1rem;
  margin-left: 8px;
  font-weight: 500;
  position: relative;
  top: 1px;
}

.details {
  position: relative;
  padding-bottom: 70px;
  margin: 0 10px;
}
</style>
