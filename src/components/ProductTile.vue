<template>
  <router-link :to="link" class="link">
    <div class="card">
      <div class="image">
        <div v-if="this.image == null" class="no-image">
          <i class="fa-solid fa-image fa-2xl"></i>
        </div>
        <img v-else :src="this.image" alt="Produkt Bild" />
      </div>
      <div class="info">
        <div>
          <p class="name">{{ data.name }}</p>
        </div>
        <div>
          <p v-if="showCategory" class="company_name">
            {{ data.categories[0] }}
          </p>
          <p v-else class="company_name">{{ data.company.name }}</p>
        </div>

        <p class="price">{{ data.price }} $</p>

        <div v-if="data.stars > 0" class="product-stars">
          <div>
            <span class="average">{{ data.stars }}</span>
            <i class="fa-solid fa-star fa-xl solid-star"></i>
          </div>
        </div>

        <button
          v-if="data.delivery && false"
          class="btn btn-primary"
          @click="addProductToCart"
          type="button"
          disabled
        >
          <i class="fa-solid fa-cart-plus fa-lg"></i>
        </button>
      </div>
    </div>
  </router-link>
</template>

<script>
import router from '@/router';
import { useStore } from 'vuex';
import { supabase } from '../supabase';

export default {
  name: 'ProductTile',
  props: ['data', 'showCategory'],
  setup() {
    const store = useStore();

    return {
      store,
    };
  },
  data() {
    return {
      image: null,
    };
  },
  async mounted() {
    if (this.data.product_picture != null) {
      const response = await supabase.storage
        .from('public/products-pictures')
        .download(this.data.product_picture);
      if (response.data != null) this.image = await response.data.text();
      if (response.error) console.warn(response.error);
    }
  },
  methods: {
    addProductToCart() {
      if (this.store.getters.getUser == null)
        router.push({ path: 'auth', query: { redirect: 'angebote' } });
      this.store.commit('addProductToCart', this.data);
    },
  },
  computed: {
    link() {
      return `/${this.data.company.alias}/${this.data.id}`;
    },
  },
};
</script>

<style scoped>
.price,
.name {
  font-size: 1.25rem;
  padding: 0;
  margin: 0;
  font-weight: 600;
}

.name {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
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
  margin-top: -3px;
}

.price {
  position: absolute;
  text-align: left;
  bottom: 8px;
  left: 15px;
  color: black;
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
  width: 58%;
  height: 100%;
  top: 0;
  left: 40%;
}

.card {
  flex-direction: row;
  overflow: hidden;
  margin: 2.5%;
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
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: cover;
}

.btn-primary {
  background-color: #00a100;
  border-color: #00a100;
}

.btn-primary:hover {
  background-color: #007400;
  border-color: #007400;
}

.fa-image {
  position: absolute;
  font-size: 4rem;
  top: 50%;
  left: calc(50% - 2rem);
  color: black;
}

.product-stars {
  position: absolute;
  right: 0;
  bottom: 9px;
}

.average {
  color: black;
  font-size: 1.3rem;
  position: relative;
  top: 2px;
  margin-right: 5px;
}

.fa-star {
  margin-right: 5px;
}

.solid-star {
  color: #e3c100;
}

.stars {
  display: flex;
}

/*   border-radius: 0.375rem 0 0 0.375rem; */
</style>
