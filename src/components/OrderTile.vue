<template>
  <router-link :to="link">
    <div v-if="!loading" class="card">
      <div>
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
            <span v-if="this.data.driver == null" class="badge text-bg-warning"
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

      <div class="deliver_to">
        <i class="fa-solid fa-location-dot"></i>
        <span>{{ this.data.deliver_to }}</span>
      </div>

      <div class="order_details">
        <div class="product_count">
          <i class="fa-solid fa-box-open"></i>
          <span>{{ this.data.products.length }}</span>
        </div>

        <span class="order_price">{{ this.data.order_price }} $</span>
      </div>

      <button
        v-if="this.data.delivery_time == null"
        @click.prevent="$router.push(qrLink)"
        class="btn btn-primary btn-sm"
      >
        <i class="fa-solid fa-qrcode fa-xl"></i>
      </button>
    </div>
  </router-link>
</template>

<script>
import { cutSecondsFromTime, reformatDate } from '@/helpers';

export default {
  name: 'OrderTile',
  props: ['data'],
  data() {
    return {
      day: '',
      order_time: '',
      delivery_time: '',
      loading: true,
    };
  },
  mounted() {
    this.day = reformatDate(this.data.day);
    this.order_time = cutSecondsFromTime(this.data.order_time);
    this.delivery_time = cutSecondsFromTime(this.data.delivery_time);

    this.loading = false;
  },
  computed: {
    link() {
      if (this.data == undefined) return '';
      return `/orders/${this.data.id}`;
    },
    qrLink() {
      if (this.data == undefined) return '';
      return `/orders/${this.data.id}/qr`;
    },
  },
};
</script>

<style scoped>
.card {
  overflow: hidden;
  text-align: left;
  padding: 10px;
}

.card:hover {
  color: #0d6efd;
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
}

.order_info {
  float: left;
}

.product_count {
  display: inline;
  margin-right: 20px;
}

.order_details {
  margin-top: 20px;
  margin-bottom: -10px;
}

.deliver_to {
  margin-top: 20px;
}

.badge {
  position: relative;
  bottom: 3px;
}

.btn-primary {
  background-color: #00a100;
  border-color: #00a100;
  position: absolute;
  bottom: 5px;
  right: 10px;
  padding: 7px 7px 5px 7px;
}

.btn-primary:hover {
  background-color: #007400;
  border-color: #007400;
}

.fa-qrcode {
  margin: 0;
}

/*   border-radius: 0.375rem 0 0 0.375rem; */
</style>
