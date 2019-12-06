import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        username: '',
        privateKey: '',
        loggedIn: false
    },
    mutations: {
        login (state, payload) {
            state.username = payload.username;
            state.privateKey = payload.privateKey;
            state.loggedIn = true;
        }
    }
});

export default store;
