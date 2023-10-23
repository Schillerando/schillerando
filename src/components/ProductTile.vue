<template>
  <!--eslint-disable-next-line-->
  <a :is="noLink ? 'span' : 'a'" @click="openLink" class="hover">
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

        <button
          v-if="data.delivery"
          class="btn btn-primary"
          @click.prevent="addProductToCart"
          type="button"
          disabled
        >
          <i class="fa-solid fa-cart-plus fa-lg"></i>
        </button>
      </div>
    </div>
  </a>
</template>

<script>
import router from '@/router';
import { useStore } from 'vuex';
import { supabase } from '@/supabase';

export default {
  name: 'ProductTile',
  props: ['data', 'showCategory', 'linkViaEvent'],
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
    addProductToCart(event) {
      event.stopPropagation()

      if (this.store.getters.getUser == null)
        router.push({ path: 'auth', query: { redirect: 'angebote' } });
      this.store.commit('addProductToCart', this.data);
    },
    openLink() {
      console.log('Company tile: link via event?', this.$props.linkViaEvent)
      if (this.$props.linkViaEvent) {
        history.pushState({}, null, process.env.VUE_APP_MAIN_URL + `/${this.data.company.alias}/${this.data.id}`)
        const event = new CustomEvent('openProductDetailView', { detail: this.data.id });
        document.dispatchEvent(event);
      } else {
        //router.go({path:`/${this.data.company.alias}/${this.data.id}`});
        let link = document.createElement('a');
        link.href = `/${this.data.company.alias}/${this.data.id}`
        link.click();
      }
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
  background-color: white;
  width: 100%;
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

/*   border-radius: 0.375rem 0 0 0.375rem; */
</style>
