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
            <div class="list">
              <div v-for="product in products" v-bind:key="product.id">
                <ShoppingCartTile :data="product" />
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
import ShoppingCartTile from './ShoppingCartTile.vue';

export default {
  name: 'ShoppingCart',
  components: {
    ShoppingCartTile,
  },
  data() {
    return {
      showCard: false,
    };
  },
  setup() {
    const store = useStore();
    const userData = computed(() => store.state.user);
    const products = computed(() => {
      const stackedProducts = [];
      const cartProducts = store.state.shoppingCart;

      cartProducts.forEach((product) => {
        const index = stackedProducts.findIndex((p) => p.id == product.id);
        if (index == -1) {
          product.count = 1;
          stackedProducts.push(product);
        } else {
          stackedProducts[index].count += 1;
        }
      });

      return stackedProducts;
    });

    const productCount = computed(() => store.state.shoppingCart.length);

    return {
      userData,
      products,
      productCount,
    };
  },
};
</script>

<style scoped>
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
  z-index: 499;
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
  z-index: 499;
  -webkit-transform: translate3d(0, 0, 0);
  -o-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.5);
}

i {
  color: #fff;
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
  z-index: 499;
}

.list {
  margin: 0 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
}

.order-button {
  font-size: 1.25rem;
  height: 45px;
}
</style>
