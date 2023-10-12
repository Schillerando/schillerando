<template>
  <TitleDiv title="Unternehmen" />
  <SortableList :items="companies" :loading="loading" element="CompanyTile" />
  <div
    v-if="loading"
    class="spinner-border"
    style="width: 4rem; height: 4rem; border-width: 7px"
    role="status"
  >
    <span class="visually-hidden">Loading...</span>
  </div>
</template>

<script>
import SortableList from '@/components/SortableList.vue';
import { supabase } from '@/supabase';
import TitleDiv from '../components/TitleDiv';

export default {
  name: 'CompanyView',
  components: {
    TitleDiv,
    SortableList,
  },
  data() {
    return {
      companies: [],
      loading: true,
    };
  },
  async created() {
    try {
      const { data, error } = await supabase
        .from('companies')
        .select()
        .eq('verified', true)
        .neq('abo', null);
      if (error) throw error;
      this.companies = data;

      for (var i = 0; i < this.companies.length; i++) {
        this.companies[i].stars = 0;
      }

      {
        const { data, error } = await supabase.from('product_reviews').select();

        if (error) throw error;

        var company_reviews = [];
        data.forEach((review) => {
          var index = company_reviews.findIndex(
            (company) => company.id == review.company
          );

          if (index == -1) {
            company_reviews.push({
              id: review.company,
              products: [{ id: review.product, stars: review.stars, count: 1 }],
            });
          } else {
            var p_index = company_reviews[index].products.findIndex(
              (product) => product.id == review.product
            );

            if (p_index == -1) {
              company_reviews[index].products.push({
                id: review.product,
                stars: review.stars,
                count: 1,
              });
            } else {
              company_reviews[index].products[p_index].stars += review.stars;
              company_reviews[index].products[p_index].count++;
            }
          }
        });

        company_reviews.forEach((company) => {
          var index = this.companies.findIndex((c) => c.id == company.id);

          if (index == -1) return;

          var stars = 0;
          company.products.forEach((product) => {
            stars += Math.round((product.stars / product.count) * 10) / 10;
          });

          this.companies[index].stars =
            Math.round((stars / company.products.length) * 10) / 10;
        });
      }
    } catch (e) {
      console.log(e);
    }

    //does not work, do this in th tile as it used to be
    /*this.companies.forEach(async (company) => {
      if (company.header_picture != null) {
        const { data } = await supabase.storage
          .from('public/sellers-headings')
          .download(company.header_picture);

        company.image = data;
      } else company.image = null;
    });*/

    this.loading = false;
  },
};
</script>

<style>
.spinner-border {
  color: #00a100;
}
</style>
