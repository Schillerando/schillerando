<template>
    <div class="row">
    <div class="col col-xl-1 col-xxl-2 big"></div>

    <div v-if="!loading" class="col col-lg-6 col-xl-5 col-xxl-4">
      <div class="mapWrapper">
        <MapProvider
          @pickCompany="pickCompany($event)"
          class="map"
          :companies="companies"
        />
      </div>
    </div>

    <div
      v-if="companies.length > 0"
      class="col col-lg-6 col-xl-5 col-xxl-4 big"
    >
      <div class="company">
        <CompanyTile
          :no-margin="true"
          :data="
            pickedCompany == null
              ? companies[companies.findIndex((c) => c.alias == 'schillerando')]
              : pickedCompany
          "
        />
      </div>
    </div>

    <div v-if="pickedCompany != null" id="company" class="small">
      <div class="company">
        <CompanyTile :data="pickedCompany" :no-margin="true" />
      </div>
    </div>
  </div>
</template>

<script>
import CompanyTile from '@/components/CompanyTile.vue';
import MapProvider from '@/components/MapProvider.vue';

export default {
  name: 'CompanyMap',
  components: {
    CompanyTile,
    MapProvider,
  },
  data() {
    return {
      pickedCompany: null,
      loading: true,
    };
  },
  props: ['companies'],
  async created() {
    this.loading = false;
  },
  methods: {
    async pickCompany(company) {
      this.pickedCompany = company;

      await new Promise((resolve) => setTimeout(resolve, 100));

      var element = document.getElementById('company');

      if (element == null) return;

      element.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    },
  },
};
</script>