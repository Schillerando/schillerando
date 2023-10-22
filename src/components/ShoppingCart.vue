<template>
  <!-- Overlay -->
  <div class="overlay" v-if="userData != null" :class="{ open: showCard }">
    <!-- Icon -->
    <Transition>
      <button
        type="button"
        class="icon"
        v-if="!showCard"
        @click="showCard = true"
      >
        <!--
        <div v-if="this.products.length > 0" class="product-count">
          {{ products.length }}
        </div>
         -->
        <span
          v-if="this.products.length > 0"
          class="product-count translate-middle badge rounded-pill bg-danger"
        >
          {{ productCount }}
          <span class="visually-hidden">Angebote</span>
        </span>
        <i class="fa-solid fa-cart-shopping fa-2xl"></i>
      </button>
    </Transition>

    <Transition>
      <div class="shopping-card" v-if="showCard">
        <div class="card outer-card">
          <div class="card-header">
            <div>
              <h4 class="card-title">Warenkorb</h4>
              <button
                type="button"
                class="btn-close"
                aria-label="Close"
                @click="showCard = false"
              ></button>
            </div>
          </div>
          <div class="card-body scroll">
            <div v-if="hasActiveOrder" class="alert alert-warning">
              Du kannst nicht mehrere Bestellungen gleichzeitig aufgeben. Warte
              bis deine vorherige Bestellung eingetroffen ist!
            </div>
            <div v-else-if="companyCount > 3" class="alert alert-warning">
              Du kannst nur Produkte von maximal von 3 verschiedenen Unternehmen
              bestellen!
            </div>
            <div v-else-if="productCount > 10" class="alert alert-warning">
              Du kannst nur maximal 10 Produkte auf einmal bestellen!
            </div>
            <div v-else-if="companyCount > 1" class="alert alert-primary">
              Bei Bestellung von Produkten von mehr als einem Unternehmen fällt
              eine Liefergebühr von 5 $ an.
            </div>
            <div class="list">
              <div v-for="product in products" v-bind:key="product.id">
                <ShoppingCartTile :data="product" :editable="true" />
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="total-price">
              {{ totalPrice }} $
              <div class="delivery-costs" v-if="companyCount > 1">+ 5 $</div>
            </div>

            <button
              :disabled="
                productCount == 0 ||
                companyCount > 3 ||
                productCount > 10 ||
                hasActiveOrder ||
                true
              "
              @click="$router.push('order')"
              class="btn btn-primary order-button"
            >
              Bestellen
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'ShoppingCart',
  data() {
    return {
      showCard: false,
    };
  },
  setup() {
    const store = useStore();
    const userData = computed(() => store.state.user);
    const products = computed(() => store.state.shoppingCart);

    const totalPrice = computed(() => {
      var price = 0;

      store.state.shoppingCart.forEach((product) => {
        price += product.price;
      });

      return price;
    });

    const companyCount = computed(() => {
      var companies = [];

      store.state.shoppingCart.forEach((product) => {
        if (!companies.includes(product.company_id))
          companies.push(product.company_id);
      });

      return companies.length;
    });

    var hasActiveOrder = computed(() => {
      var hasOrder = false;

      store.state.orders.forEach((order) => {
        if (order.delivery_time == null) hasOrder = true;
      });

      return hasOrder;
    });

    return {
      userData,
      products,
      totalPrice,
      companyCount,
      hasActiveOrder,
    };
  },
};
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.card-header {
  display: flex;
  padding-top: 12px;
}

.card-title {
  padding: 0;
  margin: 0;
  text-align: left;
  display: inline-block;
}

.card-footer {
  display: flex;
  justify-content: flex-end;
  position: relative;
}

.btn-close {
  position: absolute;
  right: 10px;
}

.overlay {
  z-index: 9999;
}

.icon {
  height: 70px;
  width: 70px;
  background-color: #00a100;
  border-radius: 100%;
  border-width: 0;
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 9999;
  -webkit-transform: translate3d(0, 0, 0);
  -o-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.5);
}

i {
  color: #fff;
}

.modal {
  height: 80%;
}

.modal-body {
  height: 100vh;
}

.outer-card {
  position: relative;
  width: 90%;
  height: 90%;
  top: 5%;
  left: 5%;
}

/*
.product-count {
  position: absolute;
  color: #00a100;
  background-color: #fff;
  border-style: solid;
  border-color: black;
  border-width: 1px;
  border-radius: 100%;
  height: 25px;
  width: 25px;
  text-align: center;
  top: 3px;
  right: 3px;
}
*/

.scroll {
  max-height: 80%;
  overflow-y: auto;
}

.product-count {
  position: absolute;
  top: 20px;
  right: -5px;
}

.shopping-card {
  position: fixed;
  width: 100%;
  height: 100%;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.fa-x {
  color: grey;
}

.close {
  display: inline-block;
}

.order-button {
  font-size: 1.1rem;
}

.price,
.name {
  font-size: 1.25rem;
  padding: 0;
  margin: 0;
  font-weight: 600;
}

.btn {
  position: absolute;
  bottom: 8px;
  right: 10px;
  padding: 3px 11px 3px 9px;
}

.name {
  text-align: left;
  margin: 10px 0 0 15px;
}

.company_name {
  text-align: left;
  margin-left: 15px;
  font-weight: 300;
}

.price {
  position: absolute;
  text-align: left;
  bottom: 8px;
  left: 15px;
}

.row {
  position: absolute;
  width: 100%;
  bottom: 0;
}

.row,
.col {
  margin: 0;
  padding: 0;
}

.info {
  position: absolute;
  width: 80%;
  height: 20%;
  top: 0;
  left: 20%;
}

.product-card {
  flex-direction: row;
  overflow: hidden;
}

.image {
  width: 40%;
  position: relative;
  padding-bottom: 40%;
  margin-right: 10px;
  border-right: 1px solid;
  border-color: #cfd4da;
}

.no-image {
  background-color: gray;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

img {
  position: absolute;
  width: 20%;
  height: 20%;
  top: 0;
  left: 0;
  object-fit: scale-down;
}

.total-price {
  position: absolute;
  left: 30px;
  font-size: 1.25rem;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

.btn:disabled {
  background-color: grey;
  border-color: grey;
}

.alert {
  margin-left: 10px;
  margin-right: 10px;
}

.delivery-costs {
  display: inline;
  color: #3284ff;
}
</style>
