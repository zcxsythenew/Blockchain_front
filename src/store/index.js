import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        address: '',
        privateKey: '',
        publicKey: '',
        admin: false,
        loggedIn: false
    },
    mutations: {
        login (state, payload) {
            state.address = payload.address;
            state.privateKey = payload.privateKey;
            state.publicKey = payload.publicKey;
            state.admin = payload.admin;
            state.loggedIn = true;
        }
    }
});

export default store;
