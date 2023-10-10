<template>
  <div>
    <AlertPopup :title="this.alertTitle" :info="this.alertInfo" />

    <!-- Reset password pop up -->
    <div
      class="modal fade"
      id="resetPasswordPopup"
      tabindex="-1"
      aria-labelledby="resetPasswordPopupLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="resetPasswordPopupLabel">
              Passwort zurücksetzten
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>Wir senden dir eine Email um dein Passwort zurückzusetzten.</p>
            <form class="needs-validation" novalidate>
              <div class="input-group mb-3">
                <span class="input-group-text"
                  ><i class="fa fa-envelope"></i
                ></span>
                <input
                  id="reset-mail"
                  type="email"
                  class="form-control"
                  placeholder="Email"
                  @input="validateReset(false)"
                  data-regex="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                  required
                />

                <div id="invalid-reset-feedback" class="invalid-feedback">
                  Bitte gebe eine gültige Email an
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="removeValidation()"
            >
              Abbrechen
            </button>
            <button
              type="button"
              @click="validateReset(true)"
              class="btn btn-primary"
            >
              Email senden
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Log in -->
    <div class="cont">
      <div class="container">
        <div class="row justify-content-center">
          <div id="flipper" class="flipper col-md-8">
            <div class="card-flipper" id="card-flipper">
              <!-- Front -->
              <div class="front" id="front">
                <div class="card-group mb-0">
                  <div class="card p-4 pb-0" id="top-card">
                    <div class="card-body">
                      <h1>Login</h1>
                      <p class="text-muted">Melde dich mit deinem Account an</p>
                      <form class="needs-validation" novalidate>
                        <div class="input-group mb-3">
                          <span class="input-group-text"
                            ><i class="fa fa-envelope"></i
                          ></span>
                          <input
                            id="login-mail"
                            type="email"
                            class="form-control"
                            placeholder="Email"
                            @input="validateSignIn(false)"
                            data-regex="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                            required
                          />

                          <div class="invalid-feedback">
                            Bitte gebe eine gültige Email an
                          </div>
                        </div>
                        <div class="input-group mb-3" id="login-passwd-group">
                          <span class="input-group-text"
                            ><i class="fa fa-lock"></i
                          ></span>
                          <input
                            id="login-passwd"
                            type="password"
                            class="form-control"
                            @input="validateSignIn(false)"
                            placeholder="Password"
                            required
                          />

                          <div class="invalid-feedback">
                            Bitte gebe ein gültiges Passwort an
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-5">
                            <button
                              type="button"
                              @click="validateSignIn(true)"
                              class="btn btn-primary px-4"
                              value="validate"
                            >
                              <div class="loading-button">Login</div>
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
                          <div class="col-7 text-right">
                            <button
                              type="button"
                              class="btn btn-link px-0"
                              data-bs-toggle="modal"
                              data-bs-target="#resetPasswordPopup"
                            >
                              Passwort vergessen?
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div class="card text-white py-5 d-md-down-none bg">
                    <div class="card-body text-center">
                      <div>
                        <h2>Sign up</h2>
                        <p>
                          Du hast noch keinen Account? Dann registriere dich
                          jetzt um Bestellungen zu tätigen oder dein Unternehmen
                          anzumelden!
                        </p>
                        <button
                          type="button"
                          @click="flipCard"
                          class="btn bg-sec mt-3 register"
                        >
                          Registrieren
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Back -->
              <div class="back" id="back">
                <div class="card-group mb-0">
                  <div class="card p-4 pb-0">
                    <div class="card-body">
                      <h1>Sign up</h1>
                      <p class="text-muted">Erstelle einen neuen Account</p>

                      <form class="needs-validation" novalidate>
                        <div class="input-group mb-3">
                          <span class="input-group-text"
                            ><i class="fa fa-user"></i
                          ></span>
                          <input
                            type="text"
                            id="signup-name"
                            class="form-control"
                            @input="validateSignUp(false)"
                            placeholder="Vor- und Nachname"
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
                            id="signup-mail"
                            class="form-control"
                            data-regex="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                            @input="validateSignUp(false)"
                            placeholder="Email (möglichst @fsgmarbach.info)"
                            required
                          />

                          <div class="invalid-feedback">
                            Bitte gib eine gültige Email an
                          </div>
                        </div>
                        <div class="input-group mb-3">
                          <span class="input-group-text"
                            ><i class="fa fa-lock"></i
                          ></span>
                          <input
                            type="password"
                            id="signup-passwd"
                            class="form-control"
                            @input="validateSignUp(false)"
                            placeholder="Password"
                            required
                          />

                          <div class="invalid-feedback">
                            Dass Passwort muss mind. 6 Zeichen lang sein
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-12">
                            <button
                              type="button"
                              @click="validateSignUp(true)"
                              class="btn btn-primary px-4"
                            >
                              <div class="loading-button">Registrieren</div>
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
                        </div>
                      </form>
                    </div>
                  </div>
                  <div class="card text-white py-5 d-md-down-none bg">
                    <div class="card-body text-center">
                      <div>
                        <h2>Log in</h2>
                        <p>
                          Du hast schon einen Account? Dann melde dich mit
                          deiner Email und deinem Passwort an!
                        </p>
                        <button
                          type="submit"
                          @click="flipCard"
                          class="btn bg-sec mt-3 register"
                        >
                          Log in
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { useStore, mapGetters } from 'vuex';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.js';
import AlertPopup from '@/shared/components/AlertPopup.vue';

export default {
  name: 'AuthView',
  components: {
    AlertPopup,
  },
  data() {
    return {
      registerSite: false,
      logInPressed: false,
      signUpPressed: false,
      resetPressed: false,
      action: '',
      alertTitle: '',
      alertInfo: '',
      successAlertTitle: 'Erfolgreich',
      successAlertInfo: 'Aktion wurde erfolgreich durchgeführt',
      failureAlertTitle: 'Fehler',
      failureAlertInfo: 'Es ist ein Fehler aufgetreten!',
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

        if(this.store.state.registered) {
          this.alertTitle = "Registrierung erfolgreich"
          this.alertInfo = "Es wurde eine Email zur Bestätigung deiner Email-Addresse verschickt."

          this.store.commit('setRegistered', false)
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

        if (this.action == 'register') {
          if (this.store.state.error.status == 429) {
            this.failureAlertTitle = 'Server überlastet';
            this.failureAlertInfo =
              'Wir erfahren im Moment eine erhöhte Anzahl an Anmeldungen, weshalb unser Server keine Kapazität übrig hat. Versuche es später erneut.';
            this.successAlertTitle = '';
          } /* else if (false) {
            var mailInput = document.getElementById('signup-mail');
            mailInput.classList.remove('is-valid');
            mailInput.classList.add('is-invalid');

            this.failureAlertTitle = 'Registrierung fehlgeschlagen';
            this.failureAlertInfo =
              'Es existiert bereits ein Account mit dieser Email!';
            this.successAlertTitle = '';
          } */ else {
            this.failureAlertTitle = 'Registrierung fehlgeschlagen';
            this.failureAlertInfo =
              'Es gab einen Fehler bei der Registrierung. Versuche es später erneut!';
            this.successAlertTitle = '';
          }
        }

        this.alertTitle = this.failureAlertTitle;
        this.alertInfo = this.failureAlertInfo;

        if (this.alertTitle == '') return;
        var alertModal = new Modal(document.getElementById('alertModal'), {});
        alertModal.show();

        if (this.action == 'login') {
          this.signInFailure();
        } else if (this.action == 'register') {
          this.signUpFailure();
        }
      }
    },
  },
  setup() {
    const form = reactive({
      name: '',
      email: '',
      password: '',
    });
    const store = useStore();

    return {
      store,
      form,
    };
  },
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const actionQuery = urlParams.get('action');
    console.log(actionQuery)
    if (actionQuery === "register") this.flipCard()
  },
  methods: {
    flipCard() {
      this.registerSite = !this.registerSite;
      var element = document.getElementById('flipper');
      element.classList.toggle('flip');
      if (window.innerWidth < 576) {
        var $ = (window.jQuery = require('jquery'));
        $('html, body').animate({ scrollTop: '0' });
      }
      this.logInPressed = false;
      this.signUpPressed = false;

      var mailInput = document.getElementById('login-mail');
      mailInput.value = '';
      mailInput.classList.remove('is-valid');
      mailInput.classList.remove('is-invalid');
      var passwInput = document.getElementById('login-passwd');
      passwInput.value = '';
      passwInput.classList.remove('is-valid');
      passwInput.classList.remove('is-invalid');
      var nameInput = document.getElementById('signup-name');
      nameInput.value = '';
      nameInput.classList.remove('is-valid');
      nameInput.classList.remove('is-invalid');
      mailInput = document.getElementById('signup-mail');
      mailInput.value = '';
      mailInput.classList.remove('is-valid');
      mailInput.classList.remove('is-invalid');
      passwInput = document.getElementById('signup-passwd');
      passwInput.value = '';
      passwInput.classList.remove('is-valid');
      passwInput.classList.remove('is-invalid');
    },
    validateSignIn(pressed) {
      if (!pressed && !this.logInPressed) return;

      var feedbacks = document.getElementsByClassName('invalid-feedback');
      Array.from(feedbacks).forEach((feedback) => {
        feedback.style.visibility = 'visible';
        feedback.style.position = 'relative';
      });

      var mailInput = document.getElementById('login-mail');
      var passwInput = document.getElementById('login-passwd');
      mailInput.value = mailInput.value.replace(/\s/g, '');
      passwInput.value = passwInput.value.replace(/\s/g, '');
      var mailValid = false;
      var passwValid = false;

      var regex = mailInput.getAttribute('data-regex');
      if (!mailInput.value.match(regex)) {
        mailInput.classList.remove('is-valid');
        mailInput.classList.add('is-invalid');
      } else {
        mailInput.classList.remove('is-invalid');
        mailInput.classList.add('is-valid');
        mailValid = true;
      }

      if (passwInput.value.length < 6) {
        passwInput.classList.remove('is-valid');
        passwInput.classList.add('is-invalid');
      } else {
        passwInput.classList.remove('is-invalid');
        passwInput.classList.add('is-valid');
        passwValid = true;
      }

      this.logInPressed = true;

      if (passwValid && mailValid && pressed) this.signIn();
    },
    signIn() {
      this.form.email = document.getElementById('login-mail').value;
      this.form.password = document.getElementById('login-passwd').value;

      console.log(this.$route.query.redirect);
      this.store.dispatch('signInAction', {
        form: this.form,
        path: this.$route.query.redirect,
      });

      this.failureAlertTitle = 'Login fehlgeschlagen';
      this.failureAlertInfo =
        'Die angegebene Email oder das Passwort ist falsch!';
      this.successAlertTitle = '';

      this.action = 'login';
    },
    signInFailure() {
      var mailInput = document.getElementById('login-mail');
      var passwInput = document.getElementById('login-passwd');
      mailInput.classList.remove('is-valid');
      passwInput.classList.remove('is-valid');
      mailInput.classList.add('is-invalid');
      passwInput.classList.add('is-invalid');

      var feedbacks = document.getElementsByClassName('invalid-feedback');
      Array.from(feedbacks).forEach((feedback) => {
        feedback.style.visibility = 'hidden';
        feedback.style.position = 'absolute';
      });
    },
    validateSignUp(pressed) {
      if (!pressed && !this.signUpPressed) return;

      var feedbacks = document.getElementsByClassName('invalid-feedback');
      Array.from(feedbacks).forEach((feedback) => {
        feedback.style.visibility = 'visible';
        feedback.style.position = 'relative';
      });

      var nameInput = document.getElementById('signup-name');
      var mailInput = document.getElementById('signup-mail');
      var passwInput = document.getElementById('signup-passwd');
      if (pressed) nameInput.value = nameInput.value.trim();
      mailInput.value = mailInput.value.replace(/\s/g, '');
      passwInput.value = passwInput.value.replace(/\s/g, '');
      var nameValid = false;
      var mailValid = false;
      var passwValid = false;

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

      if (passwInput.value.length < 6) {
        passwInput.classList.remove('is-valid');
        passwInput.classList.add('is-invalid');
      } else {
        passwInput.classList.remove('is-invalid');
        passwInput.classList.add('is-valid');
        passwValid = true;
      }

      this.signUpPressed = true;

      if (passwValid && mailValid && nameValid && pressed) this.signUp();
    },
    signUp() {
      this.form.name = document.getElementById('signup-name').value;
      this.form.email = document.getElementById('signup-mail').value;
      this.form.password = document.getElementById('signup-passwd').value;

      this.store.dispatch('signUpAction', {
        form: this.form,
        path: this.$route.query.redirect,
      });

      this.action = 'register';
    },
    signUpFailure() {
      var feedbacks = document.getElementsByClassName('invalid-feedback');
      Array.from(feedbacks).forEach((feedback) => {
        feedback.style.visibility = 'hidden';
        feedback.style.position = 'absolute';
      });
    },
    validateReset(pressed) {
      if (!pressed && !this.resetPressed) return;

      var feedback = document.getElementById('invalid-reset-feedback');
      feedback.style.visibility = 'visible';
      feedback.style.position = 'relative';

      var mailInput = document.getElementById('reset-mail');
      var mailValid = false;

      var regex = mailInput.getAttribute('data-regex');
      if (!mailInput.value.match(regex)) {
        mailInput.classList.remove('is-valid');
        mailInput.classList.add('is-invalid');
      } else {
        mailInput.classList.remove('is-invalid');
        mailInput.classList.add('is-valid');
        mailValid = true;
      }

      this.resetPressed = true;

      if (mailValid && pressed) this.resetPassword();
    },
    resetPassword() {
      const mailInput = document.getElementById('reset-mail');
      this.form.email = mailInput.value;
      this.store.dispatch('resetPasswordAction', this.form);

      var $ = (window.jQuery = require('jquery'));
      $('#resetPasswordPopup').hide();
      $('.modal-backdrop').hide();

      this.failureAlertTitle = 'Zurücksetzten fehlgeschlagen';
      this.failureAlertInfo = 'Es gibt keinen Account mit dieser Email!';
      this.successAlertTitle = 'Passwort zurückgesetzt';
      this.successAlertInfo =
        'Es wurd ein Link zum Ändern deines Passwortes an deine Email gesendet.';

      mailInput.value = '';
      mailInput.classList.remove('is-valid');
      mailInput.classList.remove('is-invalid');

      this.resetPressed = false;
    },
    removeValidation() {
      const mailInput = document.getElementById('reset-mail');
      mailInput.value = '';
      mailInput.classList.remove('is-valid');
      mailInput.classList.remove('is-invalid');
    },
  },
};
</script>

<style scoped>
.container {
  padding: 30px;
  position: absolute;
  top: 45%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}

/* ERROR */
@media (max-width: 576px) {
  .container {
    position: relative;
    top: 0;
    left: 0;
    margin-right: 0;
    transform: translate(0, 0);
  }
}

@media (min-width: 576px) {
  .container {
    max-width: 540px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 960px;
  }
}

@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}

.card-columns .card {
  margin-bottom: 0.75rem;
}

@media (min-width: 576px) {
  .card-columns {
    column-count: 3;
    column-gap: 1.25rem;
  }
  .card-columns .card {
    display: inline-block;
    width: 100%;
  }
}
.text-muted {
  color: #9faecb !important;
}

p {
  margin-top: 0;
  margin-bottom: 1rem;
}
.mb-3 {
  margin-bottom: 1rem !important;
}

.input-group {
  position: relative;
  display: flex;
  width: 100%;
}

/* Flip */

.up {
  color: #55dd11;
}

.flipper {
  padding-left: 0px;
  padding-right: 0px;
  margin-bottom: 10px;
  perspective: 1000px;
}

.register:hover > .card-flipper {
  transform: rotateY(80deg);
}

.flipper.flip .card-flipper {
  transform: rotateY(180deg);
}

.card-flipper {
  text-align: center;
  width: 100%;
  height: 300px;
  position: relative;
  transition: transform 1500ms;
  transform-style: preserve-3d;
  top: 0;
  left: 0;
  pointer-events: none;
}

.front,
.back {
  width: 100%;
  padding: 5px;
  position: absolute;
  backface-visibility: hidden;
  pointer-events: all;
}

.front {
  z-index: 2;
}

.back {
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.back h2 {
  padding-bottom: 30px;
}

.front h2 {
  padding-bottom: 10px;
}

.spinner {
  visibility: hidden;
  position: absolute;
}
</style>
