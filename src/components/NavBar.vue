<template>
  <hr />
  <header class="navbar navbar-expand-lg navbar-light sticky-top">
    <a @click="changeLinkColors" href="/" class="brand navbar-brand">
      <img class="logo" src="@/assets/logo_transparent.png" />
      Schillerando
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarToggler"
      aria-controls="navbarToggler"
      id="nav-button"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div
      @click="changeLinkColors"
      class="collapse navbar-collapse"
      id="navbarToggler"
    >
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/start">Startseite</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/angebote">Angebote</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/unternehmen"
            >Unternehmen</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/account">Account</router-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    info: String,
  },
  mounted() {
    this.changeLinkColors();

    this.$nextTick(function () {
      window.addEventListener('scroll', function () {
        const navBar = document.getElementById('navbarToggler');

        if (navBar.classList.contains('show')) {
          const navButton = document.getElementById('nav-button');

          navBar.classList.remove('show');
          navButton['aria-expanded'] = false;
        }
      });
    });
  },
  methods: {
    collapse() {
      const navBar = document.getElementById('navbarToggler');

      if (navBar.classList.contains('show')) {
        const navButton = document.getElementById('nav-button');

        navBar.classList.remove('show');
        navButton['aria-expanded'] = false;
      }
    },
    changeLinkColors() {
      const url = window.location.href.split('/');
      const path = url[url.length - 1];
      const links = document.getElementsByClassName('nav-link');

      for (var i = 0; i < links.length; i++) {
        links[i].style.color = '#000';
      }

      switch (path) {
        case 'start':
          links[0].style.color = '#00a100';
          break;
        case 'angebote':
          links[1].style.color = '#00a100';
          break;
        case 'unternehmen':
          links[2].style.color = '#00a100';
          break;
        case 'account':
          links[3].style.color = '#00a100';
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style scoped>
.navbar-toggler {
  margin-right: 10px;
}

.indicator {
  position: absolute;
  bottom: 20px;
  height: 4px;
  width: 100px;
  background-color: #00a100;
  visibility: hidden;
}

.navbar {
  -webkit-box-shadow: 0 8px 6px -6px #b1afaf;
  -moz-box-shadow: 0 8px 6px -6px #b1afaf;
  box-shadow: 0 8px 6px -6px #b1afaf;

  margin: 0 -10px;
  padding: 12px 20px;
  text-align: left;
  background-color: white;

  z-index: 1500;
}

.navbar-brand {
  font-size: 1.5rem;
  color: #00a100;
  font-weight: 900;
  position: relative;
  top: 5px;
}

.navbar-brand:hover {
  color: #00a100;
}

.nav-item {
  padding: 0 18px;
}

.nav-link:hover {
  color: #00a100;
}

.nav-link {
  font-size: 1.2em;
  color: #000;
}

.logo {
  height: 40px;
  padding: 0 10px;
  position: relative;
  bottom: 5px;
}

@media (max-width: 991px) {
  .indicator {
    height: 0px;
  }

  label {
    position: static;
  }

  br {
    content: '';
  }
}
</style>
