<template>
  <ProductDetailView v-if="showDetails !== null" class="overlay" :productid="showDetails" />
  <div class="no-scroll">
    <TitleDiv title="Angebote" />

    <p style="margin-bottom: 50px; margin-top: -20px">
      $ <span style="font-size: 1.3rem">&#8793;</span> {{ currency_name }} (1$ =
      0.1€)
    </p>

    <SortableList v-if="!loading" :items="products" :loading="loading" element="ProductTile" />

    <div v-if="loading" class="spinner-border" style="width: 4rem; height: 4rem; border-width: 7px" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script>
import { supabase } from '@/supabase';
import SortableList from '@/components/SortableList.vue';
import TitleDiv from '@/shared/components/TitleDiv';
import ProductDetailView from './ProductDetailView.vue';

export default {
  name: 'ProductView',
  components: {
    TitleDiv,
    SortableList,
    ProductDetailView,
  },
  data() {
    return {
      products: [],
      loading: true,
      currency_name: process.env.VUE_APP_CURRENCY_NAME,
      showDetails: null,
    };
  },
  async created() {
    if (this.$route.params.productid !== undefined) this.$data.showDetails = this.$route.params.productid;
    const { data, error } = await supabase
      .from('products')
      .select(`*, company:companies(name, abo, alias, verified)`)
      .eq('public', true);

    if (error != null) console.log(error);

    var filtered = [];
    data.forEach((product) => {
      if (product.company.abo != null && product.company.verified)
        filtered.push(product);
    });

    this.products = filtered;

    this.loading = false;

    document.addEventListener('openProductDetailView', (e) => {
      console.log('[Product View] opening new product', e.detail)
      this.$data.showDetails = e.detail
    })
    document.addEventListener('dismissProductDetailView', () => {
      console.log('[Company View] dismiss detail view')
      this.$data.showDetails = null
    })
  },
};
</script>

<style>
.spinner-border {
  color: #00a100;
}
.overlay {
  background-color: white;
  position: fixed;
  top: 60px;
  z-index: 1499;
  width: 100vw;
  height: calc(100vh - 50px);
  overflow: scroll;
  padding-top: 15px;
}
.no-scroll {
  overflow-y: hidden;
}
</style>
