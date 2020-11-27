<template>
  <div class="contacts">
    <transition name="delete-contact">
      <DeleteContact v-if="isShowDeleteContact" />
    </transition>

    <div class="list-contacts">
      <transition-group name="contact">
        <Contact
          v-for="contact in contacts"
          v-bind:key="contact.id"
          v-bind:contact="contact"
        />
      </transition-group>
    </div>

    <transition name="create-contact">
      <CreateContact v-if="isShowCreateContact" />
    </transition>

    <BtnCreate />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import DeleteContact from "../components/contacts/DeleteContact";
import Contact from "../components/contacts/Contact";
import CreateContact from "../components/contacts/CreateContact";
import BtnCreate from "../components/contacts/BtnCreate";

export default {
  name: "Contacts",
  components: {
    DeleteContact,
    Contact,
    CreateContact,
    BtnCreate,
  },
  computed: {
    ...mapGetters(["contacts", "isShowDeleteContact", "isShowCreateContact"]),
  },
};
</script>

<style lang="scss" scoped>
.contacts {
  width: 100%;
  min-height: 100vh;
  background: #fff;
  padding-top: 60px;
  overflow: hidden;
}

.list-contacts {
  width: 100%;
  height: auto;
  background: #fff;
  overflow: hidden;
}
</style>
