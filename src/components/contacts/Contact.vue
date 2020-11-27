<template>
  <div class="contact">
    <div
      class="contact__info transition"
      v-bind:class="{ contact__info_showmenu: isMenuContact }"
    >
      <div class="contact__userpic b50radius transition">
        <router-link
          v-bind:to="{ name: 'contact', params: { id: contact.id } }"
        >
          <img
            v-if="!contact.useNameUserpic"
            v-bind:src="
              require(`../../assets/img/userpic/${contact.userpic}.svg`)
            "
            v-bind:alt="`${contact.name} ${contact.lastname}`"
          />

          <h1 v-if="contact.useNameUserpic">
            {{ contact.name.slice(0, 1).toUpperCase() }}
          </h1>
        </router-link>
      </div>

      <div class="contact__fullname">
        <router-link
          v-bind:to="{ name: 'contact', params: { id: contact.id } }"
        >
          <h1>{{ `${contact.name} ${contact.lastname}` }}</h1>
        </router-link>
      </div>

      <div class="contact__phone">
        <p>{{ contact.phone }}</p>
      </div>

      <div
        class="contact__menu"
        v-bind:class="{ contact__menu_active: isMenuContact }"
        v-on:click="toggleMenuContact"
      ></div>
    </div>

    <div class="contact__actions">
      <button
        class="contact__delete"
        v-on:click="showDeleteContact(contact)"
      ></button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Contact",
  props: {
    contact: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    isMenuContact: false,
  }),
  methods: {
    ...mapActions(["showDeleteContact"]),
    toggleMenuContact() {
      this.isMenuContact = !this.isMenuContact;
    },
  },
};
</script>

<style lang="scss" scoped>
.contact {
  width: 100%;
  height: 60px;
  background: #fff;
  overflow: hidden;
  position: relative;

  &-enter {
    opacity: 0;
    transform: translateY(-100%);
  }

  &-enter-to {
    opacity: 1;
    transform: translateY(0);
  }

  &-leave {
    opacity: 1;
    transform: translateY(0);
  }

  &-leave-to {
    opacity: 0;
    transform: translateY(100%);
  }

  &-enter-active,
  &-leave-active {
    transition: 0.15s linear;
  }

  &:hover &__info {
    background: #f8f8f8;
  }

  &:hover &__userpic {
    background: #f4f4f4;
  }

  /* ----------------------------------------
    Info
  ---------------------------------------- */
  &__info {
    width: 100%;
    height: 60px;
    background: #fff;
    overflow: hidden;
    z-index: 1;
    position: relative;

    &_showmenu {
      transform: translateX(-60px);
    }
  }

  &__userpic {
    width: 40px;
    height: 40px;
    background: #f8f8f8;
    overflow: hidden;
    position: absolute;
    top: 10px;
    left: 20px;

    a {
      display: block;
    }

    img {
      width: 30px;
      height: 30px;
      vertical-align: middle;
      margin: 5px;
    }

    h1 {
      text-transform: uppercase;
      text-align: center;
      line-height: 40px;
      color: #2d2d2d;
      font-size: 18px;
    }
  }

  &__fullname,
  &__phone {
    height: 20px;
    overflow: hidden;
    position: absolute;
    top: 10px;
    left: 70px;
  }

  &__phone {
    top: 30px;
  }

  &__fullname h1,
  &__phone p {
    line-height: 20px;
    color: #2d2d2d;
    font-size: 14px;
    font-weight: 500;
  }

  &__fullname a {
    display: block;
  }

  &__phone p {
    color: #eee;
    font-size: 12px;
  }

  &__menu {
    width: 30px;
    height: 30px;
    overflow: hidden;
    cursor: pointer;
    position: absolute;
    top: 15px;
    right: 20px;

    &:before {
      content: "";
      width: 16px;
      height: 16px;
      background: url("../../assets/img/icons/arrow_left.svg") center no-repeat;
      transition: 0.1s linear;
      transform: translate(-50%, -50%);
      position: absolute;
      top: 50%;
      left: 50%;
    }

    &_active:before {
      background: url("../../assets/img/icons/arrow_right.svg") center no-repeat;
    }
  }

  /* ----------------------------------------
    Actions
  ---------------------------------------- */
  &__actions {
    width: 60px;
    height: 60px;
    background: #999;
    position: absolute;
    top: 0;
    right: 0;
  }

  &__delete {
    width: 60px;
    height: 60px;
    background: #f00;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;

    &:before {
      content: "";
      width: 16px;
      height: 16px;
      background: url("../../assets/img/icons/delete.svg") center no-repeat;
      transform: translate(-50%, -50%);
      position: absolute;
      top: 50%;
      left: 50%;
    }
  }
}
</style>
