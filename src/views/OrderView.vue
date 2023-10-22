<template>
  <AlertPopup :title="this.alertTitle" :info="this.alertInfo" />

  <div class="container">
    <h1>Bestellung</h1>

    <div v-if="products.length > 0" class="list">
      <div v-for="product in products" v-bind:key="product.id">
        <ShoppingCartTile :data="product" :editable="false" />
      </div>
    </div>

    <p class="delivery-costs" v-if="companyCount > 1">
      Liefergebühr: <span class="price">5 $</span>
    </p>
    <p class="total">
      Gesamtbetrag: <span class="price">{{ totalPrice }} $</span>
    </p>

    <form class="mx-3">
      <div class="input-group mb-3">
        <span class="input-group-text"
          ><i class="fa-solid fa-location-dot"></i
        ></span>
        <textarea
          type="text"
          id="order-location"
          class="form-control"
          @input="validateOrder(false)"
          placeholder="Genaue Beschreibung des Lieferortes"
          required
          maxlength="200"
          style="resize: none"
          rows="3"
          cols="50"
          :value="order.deliver_to"
        ></textarea>
      </div>

      <div class="input-group mb-4">
        <span class="input-group-text"
          ><i class="fa-solid fa-circle-info"></i
        ></span>
        <textarea
          type="text"
          id="order-note"
          class="form-control"
          @input="validateOrder(false)"
          placeholder="Anmerkungen zur Lieferung (Sonderwünsche etc.)"
          required
          maxlength="300"
          style="resize: none"
          rows="6"
          cols="50"
          :value="order.note"
        ></textarea>
      </div>

      <div class="form-check mt-4">
        <input
          class="form-check-input"
          type="checkbox"
          value=""
          id="order-check1"
          @change="validateOrder(false)"
        />
        <label class="form-check-label" for="acceptCheck">
          Ich akzeptiere die
          <a href="/agb" class="text-primary"
            >Allgemeinen Geschäftsbedingungen</a
          >
        </label>
      </div>
      <div class="form-check mt-2 mb-4">
        <input
          class="form-check-input"
          type="checkbox"
          value=""
          id="order-check2"
          @change="validateOrder(false)"
        />
        <label class="form-check-label" for="acceptCheck">
          Ich verpflichte mich die Bestellung entgegen zu nehmen und den vollen
          Betrag der Bestellung zu bezahlen
        </label>
      </div>
    </form>

    <button
      type="button"
      @click="validateOrder(true)"
      class="btn btn-primary order-button mx-3"
    >
      <div class="loading-button">Bestellen</div>
      <div class="spinner">
        <span
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        <span class="sr-only">Loading...</span>
      </div>
    </button>
  </div>
</template>

<script>
import { useStore, mapGetters } from 'vuex';
import { reactive } from 'vue';
import ShoppingCartTile from '../components/ShoppingCartTile.vue';
import AlertPopup from '@/shared/components/AlertPopup.vue';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.js';

export default {
  name: 'OrderView',
  components: {
    ShoppingCartTile,
    AlertPopup,
  },
  data() {
    return {
      products: [],
      orderPressed: false,
      action: '',
      alertTitle: '',
      alertInfo: '',
      successAlertTitle: '',
      successAlertInfo: '',
      failureAlertTitle: 'Bestellung fehlgeschlagen',
      failureAlertInfo:
        'Bei der Bestellung ist ein Fehler aufgetreten. Versuche es später erneut!',
    };
  },
  computed: {
    ...mapGetters(['getState']),
  },
  watch: {
    getState(newValue) {
      var spinners = document.getElementsByClassName('spinner');
      var loadingButtons = document.getElementsByClassName('loading-button');

      if (newValue == 'loading') {
        Array.from(spinners).forEach((spinner) => {
          spinner.style.visibility = 'visible';
          spinner.style.position = 'relative';
        });

        Array.from(loadingButtons).forEach((button) => {
          button.style.visibility = 'hidden';
          button.style.position = 'absolute';
        });
      } else if (newValue == 'success') {
        Array.from(spinners).forEach((spinner) => {
          spinner.style.visibility = 'hidden';
          spinner.style.position = 'absolute';
        });

        Array.from(loadingButtons).forEach((button) => {
          button.style.visibility = 'visible';
          button.style.position = 'relative';
        });

        this.alertTitle = this.successAlertTitle;
        this.alertInfo = this.successAlertInfo;

        if (this.alertTitle == '') return;
        alertModal = new Modal(document.getElementById('alertModal'), {});
        alertModal.show();

        this.$router.replace('/account');
      } else {
        Array.from(spinners).forEach((spinner) => {
          spinner.style.visibility = 'hidden';
          spinner.style.position = 'absolute';
        });

        Array.from(loadingButtons).forEach((button) => {
          button.style.visibility = 'visible';
          button.style.position = 'relative';
        });

        this.alertTitle = this.failureAlertTitle;
        this.alertInfo = this.failureAlertInfo;

        if (this.alertTitle == '') return;
        var alertModal = new Modal(document.getElementById('alertModal'), {});
        alertModal.show();
      }
    },
  },
  setup() {
    const store = useStore();

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

    const productCount = store.state.shoppingCart.length;

    var price = 0;

    store.state.shoppingCart.forEach((product) => {
      price += product.price;
    });

    var companies = [];

    store.state.shoppingCart.forEach((product) => {
      if (!companies.includes(product.company_id))
        companies.push(product.company_id);
    });

    const companyCount = companies.length;

    var totalPrice = price;

    if (companyCount > 1) totalPrice += 5;

    const order = reactive({
      deliver_to: '',
      products: [],
      orderPrice: 0,
      payed: false,
      delivered: false,
      note: '',
    });

    var hasActiveOrder = false;

    store.state.orders.forEach((order) => {
      if (order.delivery_time == null) hasActiveOrder = true;
    });

    return {
      store,
      stackedProducts,
      productCount,
      totalPrice,
      order,
      companyCount,
      hasActiveOrder,
    };
  },
  mounted() {
    if (
      this.companyCount > 3 ||
      this.productCount > 10 ||
      this.hasActiveOrder
    ) {
      this.$router.back();
    }

    this.order.products = this.store.state.shoppingCart;
    this.order.totalPrice = this.totalPrice;

    this.stackedProducts.forEach((product) => this.products.push(product));
  },
  methods: {
    validateOrder(pressed) {
      var locationInput = document.getElementById('order-location');
      var noteInput = document.getElementById('order-note');
      var checkInput1 = document.getElementById('order-check1');
      var checkInput2 = document.getElementById('order-check2');

      if (!pressed && !this.orderPressed) return;

      if (pressed) locationInput.value = locationInput.value.trim();
      if (pressed) noteInput.value = noteInput.value.trim();
      var valid = true;

      this.order.deliver_to = locationInput.value;
      this.order.note = noteInput.value;

      if (locationInput.value.trim().length < 3) {
        locationInput.classList.remove('is-valid');
        locationInput.classList.add('is-invalid');
        valid = false;
      } else {
        locationInput.classList.remove('is-invalid');
        locationInput.classList.add('is-valid');
      }

      if (!checkInput1.checked) {
        checkInput1.classList.add('is-invalid');
        checkInput1.classList.remove('is-valid');
        valid = false;
      } else {
        checkInput1.classList.remove('is-invalid');
        checkInput1.classList.add('is-valid');
      }

      if (!checkInput2.checked) {
        checkInput2.classList.add('is-invalid');
        checkInput2.classList.remove('is-valid');
        valid = false;
      } else {
        checkInput2.classList.remove('is-invalid');
        checkInput2.classList.add('is-valid');
      }

      this.orderPressed = true;

      if (valid && pressed) {
        this.continuePressed = false;
        this.store.dispatch('order', this.order);
      }
    },
  },
};
</script>

<style scoped>
h1 {
  margin: 30px 0 30px 20px;
}

.container {
  text-align: left;
}

.list {
  margin: 0 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
}

.total {
  font-weight: 700;
  font-size: 1.4rem;
  margin: 5px 0 40px 20px;
}

.delivery-costs {
  font-weight: 400;
  font-size: 1.3rem;
  margin: 10px 0 0 20px;
}

.price {
  font-weight: 500;
}

.input-group-text {
  width: 40px;
}

.fa-location-dot {
  position: relative;
  left: 2px;
}

.order-button {
  font-size: 1.25rem;
  margin-bottom: 100px;
}

.spinner {
  visibility: hidden;
  position: absolute;
}
</style>
