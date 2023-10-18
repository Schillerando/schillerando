<template>
  <div class="outer">
    <button class="btn btn-primary back" @click="goBack">
      <i class="fa-solid fa-arrow-left fa-xl"></i>
    </button>
    <div
      v-if="this.product === undefined"
      class="spinner-border"
      style="width: 4rem; height: 4rem; border-width: 7px; margin-top: 50px"
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
    <div v-else-if="this.product === null" class="mt-4">
      <h3 class="m-4" style="text-align: center">
        Ups, dieses Seite scheint nicht zu existieren
      </h3>
    </div>
    <div v-else class="row wrapper">
      <div class="col-lg-5 col-xl-4 spacer no-border"></div>
      <div class="wrapper col-lg-5 col-xl-4">
        <div class="image">
          <div v-if="this.image == null" class="no-image">
            <i class="fa-solid fa-image fa-2xl"></i>
          </div>
          <img v-else :src="this.image" alt="Produkt Bild" id="companyImage" />
        </div>

        <div class="detail-wrapper">
          <div class="details">
            <div class="row spacing">
              <h1 class="col-8 title">
                {{ this.product.name }}
              </h1>
              <div class="col-4">
                <p class="price">{{ product.price }} $</p>
              </div>
            </div>

            <div v-if="product.categories != null" class="category spacing">
              {{ product.categories[0] }}
            </div>

            <div class="spacing link">
              <router-link :to="`/${this.product.company.alias}`">
                {{ product.company.name }}
              </router-link>
            </div>

            <div class="row spacing">
              <p class="info">
                {{ this.product.info }}
              </p>
            </div>
          </div>

          <div class="spacing">
            <button
              v-if="product.delivery"
              class="btn btn-primary"
              @click="addProductToCart"
              type="button"
              disabled
            >
              <div class="cart">Warenkorb</div>
              <i class="fa-solid fa-cart-plus fa-lg"></i>
            </button>
          </div>
        </div>

        <hr />
      </div>

      <div class="col-lg-7 col-xl-8">
        <h4 class="review">Noch keine Bewertungen vorhanden</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from '../supabase';
import { useStore } from 'vuex';

export default {
  name: 'ProductDetailView',
  props: ['companyuuid', 'productid'],
  setup() {
    const store = useStore()

    return {
      store
    }
  },
  data() {
    return {
      product: undefined,
      image: null,
    };
  },
  async mounted() {
    let productid = undefined
    if (this.$route.params.productid) productid = this.$route.params.productid
    if (this.$props.productid) productid = this.$props.productid
    console.log(productid, this.$props.productid, this.$route.params.productid)
    if (productid) {
      const { data, error } = await supabase
        .from('products')
        .select(`*, company:companies(name, alias)`)
        .eq('id', productid);
      if (error != null) console.log(error);
      if (data === null || data.length === 0) {
        this.product = null;
        return;
      }
      this.product = data[0];

      if (this.product.product_picture != null) {
        const response = await supabase.storage
          .from('public/products-pictures')
          .download(this.product.product_picture);
        if (response.data != null) this.image = await response.data.text();
        if (response.error) console.warn(response.error);
      }
    }
  },
  methods: {
    addProductToCart() {
      console.log(this.$route.path)

      if (this.store.getters.getUser == null)
        this.$router.push({ path: 'auth', query: { redirect: this.$route.path } });
      this.store.commit('addProductToCart', this.product)
    },
    goBack() {
      history.pushState({}, null, process.env.VUE_APP_MAIN_URL + '/angebote')
      const event = new CustomEvent('dismissProductDetailView');
      document.dispatchEvent(event);
    },
  }
};
</script>

<style scoped>
div {
  text-align: left;
}

h1,
p {
  padding: 0;
  margin: 0;
}

.image {
  width: 100%;
  position: relative;
  padding-bottom: 100%;
}

.no-image {
  background-color: gray;
  position: absolute;
  width: 100%;
  height: 100%;
}

img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  left: 0;
}

.fa-image {
  position: absolute;
  font-size: 6rem;
  top: 50%;
  left: calc(50% - 3rem);
}

.title {
  font-size: 1.9rem;
  color: #00a100;
  overflow: hidden;
  word-wrap: break-word;
}

.info {
  margin-top: 10px;
  font-size: 1.1rem;
}

.details {
  margin-top: 15px;
}

.company-badge {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  float: right;
  right: 12px;
}

.spacing {
  position: relative;
  padding: 0;
  margin: 7px 7px 0 15px;
}

.category {
  margin-top: 0px;
  font-weight: 300;
}

.location {
  color: gray;
  padding: 0;
  display: flex;
  margin-bottom: 20px;
}

.location-text {
  margin-left: 5px;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.2rem;
  max-height: 1.2rem;
  overflow: hidden;
}

.products {
  margin-top: 20px;
  text-align: center;
}

.wrapper {
  padding: 0;
  margin: 0;
}

.col-lg-7 {
  margin: 10px 0;
  padding: 0;
}

.price {
  color: black;
  font-size: 1.6rem;
  text-align: right;
}

.outer {
  margin-bottom: 100px;
}

.review {
  text-align: center;
  margin: 20px 10px;
}

.cart {
  display: inline;
  margin-right: 10px;
  font-size: 1.2rem;
  position: relative;
  top: 1px;
}

.link {
  font-size: 1.25rem;
}

.btn-primary {
  background-color: #00a100;
  border-color: #00a100;
  margin-bottom: 20px;
  margin-top: 15px;
}

.btn-primary:hover {
  background-color: #007400;
  border-color: #007400;
}

@media (min-width: 992px) {
  .col-lg-5 {
    border-right: 1px solid;
    border-bottom: 1px solid;
    border-color: #ebebeb;
    border-radius: 0 0 0.375rem 0;
    position: absolute;
  }

  hr {
    width: 0;
  }

  .no-border {
    border-bottom: 0px solid;
    border-right: 0px solid;
  }

  .spacer {
    position: relative;
  }
}

.spinner-border {
  color: #00a100;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.back {
  z-index: 1500;
  position: fixed;
  top: 85px;
  left: 10px;
  border-radius: 100%;
  height: 50px;
  width: 50px;
}
</style>
