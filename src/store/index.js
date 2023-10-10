import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import router from '../router';
import { supabase } from '../supabase';

const store = createStore({
  state: {
    user: null,
    session: null,
    state: undefined,
    error: null,
    shoppingCart: [],
    access_token: null,
    refresh_token: null,
    registered: false,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setState(state, payload) {
      state.state = payload;
    },
    addProductToCart(state, payload) {
      state.shoppingCart.push(payload);
    },
    removeProductFromCart(state, payload) {
      state.shoppingCart.filter((product) => product.id != payload.id);
    },
    setRegistered(state, payload) {
      state.registered = payload;
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getState(state) {
      return state.state;
    },
    getProductsInCart(state) {
      return state.shoppingCart;
    },
  },
  actions: {
    async reload({ commit }) {
      var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      isSafari = true;

      try {
        const { data, error } = await supabase.auth.refreshSession();

        if (error || data.session == null) {
          if (isSafari) {
            commit('setUser', null);
          } else this.dispatch('getSharedLogin');

          this.state.access_token = null;
          this.state.refresh_token = null;
        } else {
          this.state.access_token = data.session.access_token;
          this.state.refresh_token = data.session.refresh_token;

          commit('setUser', data.user);

          if (
            data.user.user_metadata.isInDatabase == null ||
            data.user.user_metadata.isInDatabase == false
          )
            this.dispatch('addToDatabase');
          this.dispatch('checkUserCompany');
        }
      } catch (e) {
        commit('setUser', null);

        this.state.access_token = null;
        this.state.refresh_token = null;
      }

      if (!isSafari) {
        this.timer = setInterval(() => {
          this.dispatch('getSharedLogin');
        }, 1000);
      }
    },
    async getSharedLogin({ commit }) {
      const cookies = document.cookie
        .split(/\s*;\s*/)
        .map((cookie) => cookie.split('='));
      const accessTokenCookie = cookies.find(
        (x) => x[0] == 'supabase-access-token'
      );
      const refreshTokenCookie = cookies.find(
        (x) => x[0] == 'supabase-refresh-token'
      );
      if (accessTokenCookie && refreshTokenCookie) {
        if (this.getters.getUser != null) return;

        const { data, error } = await supabase.auth.setSession({
          access_token: accessTokenCookie[1],
          refresh_token: refreshTokenCookie[1],
        });

        if (error || data.session == null) {
          commit('setUser', null);

          document.cookie = `supabase-access-token=false;`;
          document.cookie = `supabase-refresh-token=false;`;
        } else {
          if (this.getters.getUser != null) {
            commit('setUser', data.user);

            this.dispatch('checkUserCompany');
          } else {
            commit('setUser', data.user);

            this.dispatch('checkUserCompany');

            router.go(router.currentRoute);
          }
        }
      } else if (this.getters.getUser != null) {
        commit('setUser', null);
        router.go(router.currentRoute);
      } else {
        commit('setUser', null);
      }
    },
    async addToDatabase() {
      try {
        const { error } = await supabase.from('users').insert({
          id: this.state.user.id,
          email: this.state.user.email,
          name: this.state.user.user_metadata.name,
        });

        if (error) throw error;

        {
          const { error } = await supabase.auth.updateUser({
            data: { isInDatabase: true },
          });

          if (error) throw error;
        }
      } catch (e) {
        console.log(e);
      }
    },
    // eslint-disable-next-line no-empty-pattern
    async externLoginCallback({ }, path) {
      window.location.replace(
        process.env.VUE_APP_BUSINESS_URL +
        path +
        '?ext=true&access_token=' +
        store.state.access_token +
        '&refresh_token=' +
        store.state.refresh_token
      );
    },
    // eslint-disable-next-line no-empty-pattern
    async internLoginCallback({ }, path) {
      var p = '';
      if (path != undefined && path != null && path != '/') p = path;

      window.location.replace(
        process.env.VUE_APP_INTERN_URL +
        p +
        '?int=true&access_token=' +
        store.state.access_token +
        '&refresh_token=' +
        store.state.refresh_token
      );
    },
    async signInAction({ commit }, { form, path }) {
      try {
        commit('setState', 'loading');

        const { data, error } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });
        if (error) throw error;
        console.log('Successfully signed in');
        commit('setUser', data.user);
        this.dispatch('checkUserCompany');

        commit('setState', 'success');

        this.state.access_token = data.session.access_token;
        this.state.refresh_token = data.session.refresh_token;

        if (path == null) await router.replace('/account');
        else if (path.includes('ext')) {
          this.dispatch('externLoginCallback', path.split('_')[1]);
        } else if (path.includes('int')) {
          this.dispatch('internLoginCallback', path.split('_')[1]);
        } else await router.replace(path);
      } catch (error) {
        commit('setState', 'failure');
        console.log(error.error_description || error.message);
      }
    },

    async signUpAction({ commit }, { form, path }) {
      try {
        commit('setState', 'loading');

        const splitBySpace = form.name.split(" ")
        let formattedName = ""
        for (let i = 0; i < splitBySpace.length; i++) {
          let splitByHyphen = splitBySpace[i].split("-")
          let subName = ""
          for (let j = 0; j < splitByHyphen.length; j++) {
            if (splitByHyphen[j].toLowerCase() === "von") subName += "von-"
            else if (splitByHyphen[j].toLowerCase() === "zu") subName += "zu-"
            else subName += splitByHyphen[j].charAt(0).toUpperCase() + splitByHyphen[j].slice(1).toLowerCase() + "-";
          }
          subName = subName.slice(0, subName.length - 1);
          formattedName += subName + " "
        }
        formattedName.slice(0, -1);

        const { data, error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {
            emailRedirectTo: 'https://schillerando.de/account',
            data: {
              name: formattedName,
              isInDatabase: true,
              isCompanyLeader: false,
            },
          },
        });

        if (error) throw error;

        {
          const { error } = await supabase.from('users').insert({
            id: data.user.id,
            email: data.user.email,
            name: formattedName,
          });

          if (error) throw error;
        }

        console.log('Successfully registered');
        commit('setUser', data.user);
        commit('setRegistered', true);

        commit('setState', 'success');

        this.dispatch('checkUserCompany');

        console.log(path);

        if (path == null) await router.replace('/account');
        else if (path.includes('ext')) {
          this.dispatch('externLoginCallback', path.split('_')[1]);
        } else await router.replace(path);
      } catch (error) {
        this.state.error = error;
        commit('setState', 'failure');
        console.log(error.error_description || error.message);
      }
    },

    async signOutAction({ commit }) {
      try {
        commit('setState', 'loading');

        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        commit('setUser', null);
        console.log('Logged Out successfully');

        commit('setState', 'success');

        this.state.access_token = null;
        this.state.refresh_token = null;

        await router.replace('/auth');
      } catch (error) {
        commit('setState', 'failure');
        console.log(error.error_description || error.message);
      }
    },

    async resetPasswordAction({ commit }, form) {
      try {
        commit('setState', 'loading');

        const { error } = await supabase.auth.resetPasswordForEmail(
          form.email,
          {
            redirectTo: process.env.VUE_APP_MAIN_URL + '/update-password',
          }
        );
        if (error) throw error;

        commit('setState', 'success');
      } catch (error) {
        commit('setState', 'failure');
        console.log(error.error_description || error.message);
      }
    },
    async updatePasswordAction({ commit }, form) {
      try {
        commit('setState', 'loading');

        const { error } = await supabase.auth.updateUser({
          password: form.password,
        });
        if (error) throw error;

        commit('setState', 'success');

        await router.replace('/account');
      } catch (error) {
        commit('setState', 'failure');
        console.log(error.error_description || error.message);
      }
    },

    async checkUserCompany({ commit }) {
      try {
        const { data, error } = await supabase
          .from('companies')
          .select()
          .or(
            'user_uid.eq.' +
            this.getters.getUser.id +
            ',employees.cs.' +
            '{"' +
            this.getters.getUser.email +
            '"}'
          );

        if (error) throw error;

        let user = this.getters.getUser;
        user.hasCompany = false;
        commit('setUser', user);
        if (data[0] == null) return;

        user.hasCompany = true;
        commit('setUser', user);
      } catch (error) {
        console.log(error.error_description || error.message);
      }
    },

    // eslint-disable-next-line no-empty-pattern
    async addQRCodeCount({ }, id) {
      try {
        const { data, error } = await supabase
          .from('stats')
          .select()
          .eq('id', id);

        if (error) throw error;
        if (data[0] == null) throw error;

        var count = data[0].count;
        {
          const { error } = await supabase
            .from('stats')
            .update({
              count: count + 1,
            })
            .eq('id', id);

          if (error) throw error;
        }
        console.debug(
          'Updated stats: ID is: ' + id + '; count before was: ' + count
        );
      } catch (error) {
        console.error(
          'Error updating QR code stat',
          error.error_description || error.message
        );
      }
    },
  },

  modules: {},

  plugins: [createPersistedState()],
});

export default store;
