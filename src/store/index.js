import Vue from "vue";
import Vuex from "vuex";
import Contacts from "../mocks/contacts";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    contacts: [...Contacts],
    dataDeleteContact: {},
    isShowDeleteContact: false,
    isShowCreateContact: false,
  },
  mutations: {
    showDeleteContact(state, payload) {
      state.dataDeleteContact = payload;
      state.isShowDeleteContact = true;
    },
    hideDeleteContact(state) {
      state.isShowDeleteContact = false;
    },
    deleteContactByID(state, id) {
      state.contacts = state.contacts.filter((c) => c.id != id);
    },
    toggleShowCreateContact(state) {
      state.isShowCreateContact = !state.isShowCreateContact;
    },
    createContact(state, contact) {
      state.contacts.unshift(contact);
    },
    addNewInput(state, payload) {
      state.contacts.forEach((contact) => {
        if (contact.id == payload.id) {
          Vue.set(contact, payload.name, payload.value);
        }
      });
    },
    removeContactInput(state, payload) {
      state.contacts.forEach((contact) => {
        if (contact.id == payload.id) {
          Vue.delete(contact, payload.name);
        }
      });
    },
    updateInput(state, payload) {
      state.contacts.forEach((contact) => {
        if (contact.id == payload.id) {
          Vue.set(contact, payload.name, payload.value);
        }
      });
    },
  },
  actions: {
    showDeleteContact({ commit }, contact) {
      commit("showDeleteContact", contact);
    },
    hideDeleteContact({ commit }) {
      commit("hideDeleteContact");
    },
    deleteContactByID({ commit }, id) {
      commit("deleteContactByID", id);
    },
    toggleShowCreateContact({ commit }) {
      commit("toggleShowCreateContact");
    },
    createContact({ commit }, contact) {
      commit("createContact", contact);
    },
    addNewInput({ commit }, payload) {
      commit("addNewInput", payload);
    },
    removeContactInput({ commit }, payload) {
      commit("removeContactInput", payload);
    },
    updateInput({ commit }, payload) {
      commit("updateInput", payload);
    },
  },
  getters: {
    contacts(state) {
      return state.contacts;
    },
    dataDeleteContact(state) {
      return state.dataDeleteContact;
    },
    isShowDeleteContact(state) {
      return state.isShowDeleteContact;
    },
    isShowCreateContact(state) {
      return state.isShowCreateContact;
    },
  },
});
