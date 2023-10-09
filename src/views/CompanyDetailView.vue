<template>
  <div class="outer">
    <button @click="goBack">Zurück</button>
    <div
      v-if="this.company === undefined"
      class="spinner-border"
      style="
        width: 4rem;
        height: 4rem;
        border-width: 7px;
        position: relative;
        margin-top: 50px;
      "
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
    <div v-else-if="this.company === null" class="mt-4">
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
          <img
            v-else
            :src="this.image"
            alt="Unternehmen Bild"
            id="companyImage"
          />
        </div>

        <div class="detail-wrapper">
          <div class="details">
            <div class="row spacing">
              <h1 class="col-10 title">
                {{ this.company.name }}
              </h1>
              <div class="col-2">
                <CompanyBadge
                  :verified="this.company.verified"
                  :premium="this.company.abo == 'Business'"
                  :self="this.company.alias == 'schillerando'"
                  class="company-badge"
                />
              </div>
            </div>

            <div class="category spacing">
              {{ company.categories[0] }}
            </div>

            <div class="row spacing">
              <p class="info">
                {{ this.company.info }}
              </p>
            </div>

            <div class="row spacing location-pos">
              <div class="col-9 location">
                <i class="fa-solid fa-location-dot"></i>
                <div class="location-text">
                  {{ company.location }}&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                <a
                  v-if="
                    company.socials.instagram !== undefined &&
                    this.company.socials.instagram != ''
                  "
                  :href="company.socials.instagram"
                  class="insta"
                  ><i class="fa-brands fa-instagram fa-lg"></i
                ></a>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div
            v-if="company.pinData != undefined && !loading"
            class="mapWrapper"
          >
            <MapProvider :data="company.pinData" class="map" />
          </div>
        </div>

        <hr class="mapDivider" />
      </div>

      <div class="products col-lg-7 col-xl-8">
        <SortableList
          v-if="products.length > 0"
          :items="products"
          :no-search="true"
          sort-by-categories="true"
          show-category="true"
          element="ProductTile"
        />

        <h4 v-else class="margin">
          Dieses Unternehmen bietet keine Produkte, Aktivitäten oder
          Dienstleistungen auf Schillerando an.
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from '@/supabase';
import CompanyBadge from '@/shared/components/CompanyBadge.vue';
import SortableList from '@/components/SortableList.vue';
import MapProvider from '@/components/MapProvider.vue';

export default {
  name: 'CompanyDetailView',
  props: ['companyuuid', 'companyalias'],
  components: { CompanyBadge, SortableList, MapProvider },
  data() {
    return {
      company: undefined,
      image: null,
      products: [],
      loading: true,
    };
  },
  async mounted() {
    let alias = null
    if (this.$route.params.companyalias) {alias = this.$route.params.companyalias}
    if (this.$props.companyalias) {alias = this.$props.companyalias}
    if (alias) {
      console.log('[CompanyDetailView] companyalias', alias)
      const { data, error } = await supabase
        .from('companies')
        .select()
        .eq('alias', alias);
      if (error != null) console.log(error);
      if (data === null || data.length === 0) {
        this.company = null;
        return;
      }
      this.company = data[0];

      if (this.company.header_picture != null) {
        const response = await supabase.storage
          .from('public/sellers-headings')
          .download(this.company.header_picture);
        if (response.data != null) {
          this.image = await response.data.text();
          if (
            this.company.coordinates != undefined &&
            this.company.coordinates != null
          )
            this.company.pinData = [
              { position: this.company.coordinates, image: this.image },
            ];
        }
        if (response.error) console.warn(response.error);
      } else {
        if (
          this.company.coordinates != undefined &&
          this.company.coordinates != null
        )
          this.company.pinData = [
            { position: data[0].coordinates, image: null },
          ];
        else this.company.pinData = null;
      }

      console.log(this.company.pinData);

      {
        const response = await supabase
          .from('products')
          .select(`*, company:companies(name, abo, alias)`)
          .eq('company_id', this.company.id)
          .eq('public', true);

        if (response.data != null) {
          response.data.forEach((product) => {
            this.products.push(product);
          });
        }

        console.log('Products array of /' + this.company.alias, this.products);

        if (response.error) console.warn(response.error);
      }
    }

    if (
      this.company.socials.instagram !== undefined &&
      this.company.socials.instagram != ''
    )
      this.company.socials.instagram =
        'https://instagram.com/' + this.company.socials.instagram;

    this.loading = false;
  },
  methods: {
    goBack() {
      history.pushState({}, null, process.env.VUE_APP_MAIN_URL + '/unternehmen')
      const event = new CustomEvent('dismissDetailView');
      document.dispatchEvent(event);
    }
  },
};
</script>

<style scoped>
div {
  text-align: left;
}

h1,
p {
  padding: 0;
}

.image {
  width: 100%;
  position: relative;
  padding-bottom: 56.25%;
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
  color: #00a100;
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
  margin-top: -10px;
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

.outer {
  margin-bottom: 100px;
}

.margin {
  margin: 20px 10px;
  text-align: center;
}

.spinner-border {
  color: #00a100;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.mapWrapper {
  position: relative;
  width: calc(100% - 30px);
  padding-bottom: calc(100% - 30px);
  margin: 0 15px 0 15px;
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

.insta {
  position: relative;
  bottom: 3px;
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
</style>
