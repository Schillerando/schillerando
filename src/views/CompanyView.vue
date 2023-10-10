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
    const { data, error } = await supabase
      .from('companies')
      .select()
      .eq('verified', true)
      .neq('abo', null);
    if (error != null) console.log(error);
    this.companies = data;

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
