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
          {{ products.length }}
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
            <div v-for="product in products" v-bind:key="product.id">
              <div class="card product-card">
                <div class="image">
                  <div
                    v-if="product.product_picture == null"
                    class="no-image"
                  ></div>
                  <img v-else src="@/assets/cola.png" alt="" />
                </div>
                <div class="info">
                  <div>
                    <p class="name">{{ product.name }}</p>
                  </div>
                  <div>
                    <p class="company_name">{{ product.company_name }}</p>
                  </div>

                  <p class="price">{{ product.price }} $</p>

                  <button class="btn btn-primary" @click="addProductToCart">
                    <i class="fa-solid fa-cart-plus fa-lg"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <button class="btn btn-primary order-button">Bestellen</button>
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

    return {
      userData,
      products,
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
</style>
