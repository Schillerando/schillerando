<template>
  <div>
    <AlertPopup :title="this.alertTitle" :info="this.alertInfo" />

    <div class="container">
      <div v-if="userData != null" class="row mb-0">
        <div class="col-12">
          <div
            v-if="userData.email_confirmed_at == null"
            class="alert alert-warning"
            role="alert"
          >
            Bestätige deine Email, um Bestellungen zu tätigen oder dein
            Unternehmen zu registrieren!
          </div>
        </div>

        <div class="col-lg-4">
          <!--
          <div class="card">
            <div class="row py-3">
              <div class="credit col-5 py-1">
                <i class="fa-solid fa-credit-card fa-2xl"></i>
              </div>
              <div class="credit col-7 credit-number py-1">
                {{ this.userData.user_metadata.credit }} $
              </div>
            </div>
          </div>
          -->
          <a
            v-if="false"
            href="http://localhost:8081/setup"
            class="btn pay-setup p-0 mt-2"
          >
            <!-- https://pay.schillerando.de/setup -->
            <img
              class="img-fluid"
              src="@/assets/schillerpay_einrichten.png"
              alt="Schillerpay einrichten"
            />
          </a>

          <div class="card">
            <div class="row py-3">
              <form class="needs-validation" novalidate>
                <div class="input-group mb-3">
                  <span span class="input-group-text"
                    ><i class="fa fa-user"></i
                  ></span>
                  <input
                    type="text"
                    id="account-name"
                    class="form-control"
                    @input="validateAccountChange(false)"
                    placeholder="Name"
                    :value="this.userData.user_metadata.name"
                    :disabled="!isAccountEditing"
                    required
                  />

                  <div class="invalid-feedback">
                    Bitte gib deinen Vor- und Nachnamen an
                  </div>
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text"
                    ><i class="fa fa-envelope"></i
                  ></span>
                  <input
                    type="email"
                    id="account-mail"
                    class="form-control"
                    data-regex="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    @input="validateAccountChange(false)"
                    placeholder="Email"
                    :value="this.userData.email"
                    :disabled="!isAccountEditing"
                    required
                  />

                  <div class="invalid-feedback">
                    Bitte gib eine gültige Email an
                  </div>
                </div>
              </form>
              <div v-if="!isAccountEditing" class="py-2">
                <button
                  type="button"
                  class="btn btn-primary px-2 mx-2"
                  style="
                    display: inline;
                    float: left;
                    width: fit-content;
                    margin-bottom: 10px;
                  "
                  @click="editAccount"
                >
                  Bearbeiten
                </button>
                <div style="display: inline; float: left; width: fit-content">
                  <button
                    type="button"
                    class="btn btn-danger px-2 mx-2"
                    @click.prevent="signOut"
                  >
                    Abmelden
                  </button>
                </div>
              </div>
              <div v-else>
                <div
                  class="py-2 mx-0"
                  style="display: inline; float: left; width: fit-content"
                >
                  <button
                    type="button"
                    class="btn btn-primary px-2 mx-2"
                    @click="validateAccountChange(true)"
                  >
                    <div class="loading-button">Speichern</div>
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
                <div
                  class="py-2 mx-0"
                  style="display: inline; float: left; width: fit-content"
                >
                  <button
                    type="button"
                    class="btn btn-warning px-2 mx-2"
                    @click="cancelAccountChange()"
                  >
                    Abbrechen
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="card action p-4" v-if="userData.hasCompany == false">
            <p>Du hast ein eigenes Unternehmen bei Schule als Staat?</p>
            <button
              @click="companyRegistration()"
              class="btn bg-sec register"
              :disabled="userData.email_confirmed_at == null"
            >
              Unternehmen registrieren
            </button>
          </div>

          <div class="card action p-4" v-else>
            <p>Verwalte dein Unternehmen</p>
            <button @click="businessLink()" class="btn bg-sec register">
              Schillerando Business
            </button>
          </div>
        </div>

        <div class="col-lg-8">
          <div class="card">
            <div class="card-header">Bestellungen</div>
            <div class="card-body">
              <p v-if="true">
                Hier siehst du später alle deine getätigten Bestellungen.
                Bestellungen sind erst ab dem 23.10.2023 möglich.
              </p>

              <div
                v-else
                class="order"
                v-for="order in this.orders"
                :key="order"
              >
                <div class="card d-flex">
                  <div class="product-count" v-if="order.products != null">
                    {{ order.products.length }}
                    <i class="fa-solid fa-bag-shopping"></i>
                  </div>
                  <div class="product-count" v-else>
                    0 <i class="fa-solid fa-bag-shopping"></i>
                  </div>
                  <div class="price">{{ order.order_price }} $</div>
                  <div>
                    {{ order.deliver_to }}
                  </div>
                  <div>
                    {{ order.payed }}
                  </div>
                  <div>
                    {{ order.delivered }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--
      <div class="card-group mb-0">
        <div class="card p-4" id="top-card">
          <div class="card-body">
            

            <button @click.prevent="signOut">Sign out</button>
            <p>{{ userData }}</p>
          </div>
        </div>
      </div>

        
      <div class="card-group mb-0">
        <div class="card p-4">
          <div class="card-body">
            <div v-if="this.companyData != null">
              <label for="name">Name:</label>
              <input type="text" name="name" v-model="this.companyData.name"><br>
              <label for="info">Info:</label>
              <input type="text" name="info" v-model="this.companyData.info"><br>
              <button @click="saveChanges">Änderungen speichern</button>
            </div>
          </div>
        </div>
      </div>
      -->
    </div>
  </div>
</template>

<script>
import { supabase } from '../supabase';
import { useStore, mapGetters } from 'vuex';
import { computed } from 'vue';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.js';
import AlertPopup from '@/shared/components/AlertPopup.vue';

export default {
  name: 'AccountView',
  components: {
    AlertPopup,
  },
  data() {
    return {
      isAccountEditing: false,
      saveAccountPressed: false,
      orders: [],
      alertTitle: '',
      alertInfo: '',
      successAlertTitle: 'Erfolgreich',
      successAlertInfo: 'Aktion wurde erfolgreich durchgeführt',
      failureAlertTitle: 'Fehler',
      failureAlertInfo: 'Es ist ein Fehler aufgetreten!',
      businessUrl: process.env.VUE_APP_BUSINESS_URL,
    };
  },
  computed: {
    ...mapGetters(['getState']),
  },
  setup() {
    const store = useStore();

    const userData = computed(() => store.state.user);

    return {
      store,
      userData,
    };
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

        if (this.store.state.registered) {
          this.alertTitle = 'Registrierung erfolgreich';
          this.alertInfo =
            'Es wurde eine Email zur Bestätigung deiner Email-Addresse verschickt.';

          this.store.commit('setRegistered', false);
        }

        if (this.alertTitle == '') return;
        alertModal = new Modal(document.getElementById('alertModal'), {});
        alertModal.show();
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
  async created() {
    const { data, error } = await supabase
      .from('orders')
      .select()
      .eq('buyer', this.userData.id);

    if (error) throw error;

    this.orders = data;
  },
  methods: {
    signOut() {
      this.successAlertTitle = '';
      this.failureAlertTitle = '';
      this.store.dispatch('signOutAction');
    },
    editAccount() {
      this.isAccountEditing = true;

      var nameInput = document.getElementById('account-name');
      var mailInput = document.getElementById('account-mail');
      nameInput.disabled = false;
      mailInput.disabled = false;
    },
    companyRegistration() {
      if (this.userData.email.split('@')[1] == 'fsgmarbach.info') {
        this.store.dispatch('externLoginCallback', '/companyRegistration');
      } else {
        this.alertTitle = 'Ungültige Email';
        this.alertInfo =
          'Um ein Unternehmen zu registrieren, musst du mit deiner Schul-Email (@fsgmarbach.info) angemeldet sein. Ändere deine Email-Adresse oder erstelle einen neuen Account, um dein Unternehmen zu registrieren.';

        var alertModal = new Modal(document.getElementById('alertModal'), {});
        alertModal.show();
      }
    },
    businessLink() {
      this.store.dispatch('externLoginCallback', '/einstellungen');
    },
    validateAccountChange(pressed) {
      if (!pressed && !this.saveAccountPressed) return;

      var feedbacks = document.getElementsByClassName('invalid-feedback');
      Array.from(feedbacks).forEach((feedback) => {
        feedback.style.visibility = 'visible';
        feedback.style.position = 'relative';
      });

      var nameInput = document.getElementById('account-name');
      var mailInput = document.getElementById('account-mail');
      if (pressed) nameInput.value = nameInput.value.trim();
      mailInput.value = mailInput.value.replace(/\s/g, '');
      var nameValid = false;
      var mailValid = false;

      if (!nameInput.value.trim().includes(' ') || nameInput.value.length < 5) {
        nameInput.classList.remove('is-valid');
        nameInput.classList.add('is-invalid');
      } else {
        nameInput.classList.remove('is-invalid');
        nameInput.classList.add('is-valid');
        nameValid = true;
      }

      var regex = mailInput.getAttribute('data-regex');
      if (!mailInput.value.match(regex)) {
        mailInput.classList.remove('is-valid');
        mailInput.classList.add('is-invalid');
      } else {
        mailInput.classList.remove('is-invalid');
        mailInput.classList.add('is-valid');
        mailValid = true;
      }

      this.saveAccountPressed = true;

      if (mailValid && nameValid && pressed) this.saveAccount();
    },
    async saveAccount() {
      try {
        this.store.commit('setState', 'loading');

        this.isAccountEditing = false;
        this.saveAccountPressed = false;

        var nameInput = document.getElementById('account-name');
        var mailInput = document.getElementById('account-mail');

        const splitBySpace = nameInput.value.split(' ');
        let formattedName = '';
        for (let i = 0; i < splitBySpace.length; i++) {
          let splitByHyphen = splitBySpace[i].split('-');
          let subName = '';
          for (let j = 0; j < splitByHyphen.length; j++) {
            if (splitByHyphen[j].toLowerCase() === 'von') subName += 'von-';
            else if (splitByHyphen[j].toLowerCase() === 'zu') subName += 'zu-';
            else
              subName +=
                splitByHyphen[j].charAt(0).toUpperCase() +
                splitByHyphen[j].slice(1).toLowerCase() +
                '-';
          }
          subName = subName.slice(0, subName.length - 1);
          formattedName += subName + ' ';
        }
        formattedName.slice(0, -1);

        if (formattedName != this.userData.user_metadata.name) {
          const { data, error } = await supabase.auth.updateUser({
            data: { name: formattedName },
          });

          if (error) throw error;

          {
            const { error } = await supabase
              .from('users')
              .update('name', formattedName)
              .eq('id', data.user.id);

            if (error) throw error;
          }

          console.log(data.user);
          this.store.commit('setUser', data.user);
        }

        if (mailInput.value != this.userData.email) {
          const { error } = await supabase.auth.updateUser({
            email: mailInput.value,
            emailRedirectTo: process.env.VUE_APP_MAIN_URL + '/account',
          });

          if (error) throw error;

          {
            const { error } = await supabase
              .from('users')
              .update('email', mailInput.value)
              .eq('id', this.store.state.user.id);

            if (error) throw error;
          }

          this.successAlertTitle = 'Email Änderung bestätigen';
          this.successAlertInfo =
            'Es wurde eine Mail zum Ändern deiner Email-Adresse an deine neue Email-Adresse gesendet.';
        } else {
          this.successAlertTitle = '';
        }

        this.store.commit('setState', 'success');

        nameInput.classList.remove('is-valid');
        nameInput.classList.remove('is-invalid');
        mailInput.classList.remove('is-valid');
        mailInput.classList.remove('is-invalid');
      } catch (error) {
        this.failureAlertTitle = 'Email schon vergeben';
        this.failureAlertInfo =
          'Es gibt bereits einen Account mit dieser Email!';
        this.store.commit('setState', 'failure');
        this.cancelAccountChange();
        console.log(error.error_description || error.message);
      }
    },
    cancelAccountChange() {
      this.isAccountEditing = false;
      this.saveAccountPressed = false;

      var nameInput = document.getElementById('account-name');
      var mailInput = document.getElementById('account-mail');

      nameInput.value = this.userData.user_metadata.name;
      mailInput.value = this.userData.mail;

      nameInput.classList.remove('is-valid');
      nameInput.classList.remove('is-invalid');
      mailInput.classList.remove('is-valid');
      mailInput.classList.remove('is-invalid');
    },
  },
};
</script>

<style scoped>
.form-switch {
  width: fit-content;
  position: relative;
  margin: 0 auto;
}

.container {
  position: relative;
  text-align: center;
  width: 96%;
  padding: 0;
  margin: 50px auto;
  font-size: 1.1rem;
}

.card {
  margin: 10px 0;
}

.row {
  margin: 0;
  padding: 0;
}

.d-flex {
  flex-direction: row;
}

.credit {
  margin: auto 0;
  font-size: 1.5rem;
  font-weight: 300;
}

.credit-number {
  font-size: 2rem;
  font-weight: 600;
}

.data {
  text-align: left;
  font-weight: 300;
}

.action {
  background-color: #00a100;
  color: white;
}

.register {
  width: fit-content;
  margin: 0 auto;
}

.order .card div {
  margin: 5px 10px;
}

.product-count {
  width: 40px;
}

.product-count i {
  margin-left: 2px;
}

.price {
  width: 70px;
}

.input-group-text {
  width: 40px;
  padding: 0;
  padding-left: 10px;
}

.fa-location-dot {
  position: relative;
  left: 3px;
}

.fa-envelope {
  position: relative;
  left: 1px;
}
.fa-user {
  position: relative;
  left: 3px;
}

.fa-trash {
  position: relative;
  left: 1px;
  color: red;
}

.spinner {
  visibility: hidden;
  position: absolute;
}

.edit-buttons {
  display: inline;
  float: left;
  width: fit-content;
}

.pay-setup:hover {
  transform: scale(1.02);
}

.pay-setup:active {
  transform: scale(0.98);
}

.pay-setup {
  border: none;
  transition: all 0.2s ease-in-out;
}
</style>
