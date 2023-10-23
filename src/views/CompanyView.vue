<template>
  <CompanyDetailView
    v-if="showDetails !== null"
    class="overlay"
    :companyalias="showDetails"
    :linkViaLink="false"
  />
  <div class="no-scroll">
    <TitleDiv title="Unternehmen" />
    <div class="row no-scroll">
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
            :linkViaEvent="true"
            :data="
              pickedCompany == null
                ? companies[
                    companies.findIndex((c) => c.alias == 'schillerando')
                  ]
                : pickedCompany
            "
          />
        </div>
      </div>

      <div v-if="pickedCompany != null" id="company" class="small">
        <div class="company">
          <CompanyTile
            :linkViaEvent="true"
            :data="pickedCompany"
            :no-margin="true"
          />
        </div>
      </div>
    </div>

    <SortableList v-if="!loading" :items="companies" :loading="loading" element="CompanyTile" />
    <div
      v-if="loading"
      class="spinner-border"
      style="width: 4rem; height: 4rem; border-width: 7px"
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script>
import { supabase } from '@/supabase';
import CompanyTile from '@/shared/components/CompanyTile.vue';
import TitleDiv from '@/shared/components/TitleDiv';
import MapProvider from '@/components/MapProvider.vue';
import SortableList from '@/components/SortableList.vue';
import CompanyDetailView from './CompanyDetailView.vue';

export default {
  name: 'CompanyView',
  components: {
    TitleDiv,
    SortableList,
    MapProvider,
    CompanyTile,
    CompanyDetailView,
  },
  data() {
    return {
      companies: [],
      pickedCompany: null,
      loading: true,
      showDetails: null,
    };
  },
  async created() {
    if (this.$route.params.companyalias !== undefined)
      this.$data.showDetails = this.$route.params.companyalias;

    const { data, error } = await supabase
      .from('companies')
      .select()
      .eq('verified', true)
      .neq('abo', null);
    if (error != null) console.log(error);
    this.companies = data;

    this.loading = false;

    document.addEventListener('openDetailView', (e) => {
      console.log('[Company View] opening new company', e.detail);
      this.$data.showDetails = e.detail;
    });

    document.addEventListener('dismissDetailView', () => {
      console.log('[Company View] dismiss detail view');
      this.$data.showDetails = null;
    });
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

<style>
.site {
  position: absolute;
  width: 100vw;
  top: 50px;
  height: calc(100% - 50px);
  overflow-y: hidden;
}

.spinner-border {
  color: #00a100;
}

.row {
  margin: 0;
  margin-top: -35px;
  padding: 0;
}

.col {
  margin: 0;
  padding: 0;
}

.sizing {
  max-width: 60vh;
}

.company {
  padding: 0 25px 0 12.5px;
}

.mapWrapper {
  position: relative;
  width: calc(100% - 37.5px);
  padding-bottom: calc(100% - 37.5px);
  margin: 0 12.5px 0 25px;
}

.mapDivider {
  margin-top: 15px;
}

.map {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  left: 0;
  border-style: groove;
  border-color: #ebebeb;
  border-width: 1px;
}

.small {
  margin-top: 35px;
  margin-bottom: 20px;
  display: none;
}

.center {
  margin: 0 auto 0 auto;
}

@media (min-width: 576px) and (max-width: 992px) {
  .big {
    display: none;
  }

  .small {
    display: block;
  }

  .mapWrapper {
    position: relative;
    width: calc(100% - 150px);
    padding-bottom: calc(100% - 150px);
    margin: 0 75px 0 75px;
  }

  .company {
    padding: 0 12px 0 12px;
  }
}

@media (max-width: 576px) {
  .big {
    display: none;
  }

  .small {
    display: block;
  }

  .mapWrapper {
    position: relative;
    width: calc(100% - 50px);
    padding-bottom: calc(100% - 50px);
    margin: 0 25px 0 25px;
  }

  .company {
    padding: 0 12px 0 12px;
  }
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
