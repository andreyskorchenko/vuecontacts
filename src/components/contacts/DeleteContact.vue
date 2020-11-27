<template>
  <div class="delete-contact">
    <div class="delete-contact__overlay" v-on:click="hiddenContact"></div>

    <transition name="delete-contact__content">
      <div v-if="isShowContent" class="delete-contact__content b5radius">
        <div class="delete-contact__userpic b50radius">
          <img
            v-if="!dataDeleteContact.useNameUserpic"
            v-bind:src="
              require(`../../assets/img/userpic/${dataDeleteContact.userpic}.svg`)
            "
            v-bind:alt="
              `${dataDeleteContact.name} ${dataDeleteContact.lastname}`
            "
          />

          <h1 v-if="dataDeleteContact.useNameUserpic">
            {{ dataDeleteContact.name.slice(0, 1).toUpperCase() }}
          </h1>
        </div>

        <div class="delete-contact__fullname">
          <h2>
            {{ `${dataDeleteContact.name} ${dataDeleteContact.lastname}` }}
          </h2>
        </div>

        <div class="delete-contact__question">
          <p>Вы уверенны что хотите <br /><strong>удалить</strong> контакт?</p>
        </div>

        <button
          class="delete-contact__confirm transition"
          v-on:click="removeContact"
        >
          Да, удалить
        </button>

        <button
          class="delete-contact__cancel transition"
          v-on:click="hiddenContact"
        >
          Отменить
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "DeleteContact",
  data: () => ({
    isShowContent: false,
  }),
  computed: {
    ...mapGetters(["dataDeleteContact"]),
  },
  methods: {
    ...mapActions(["hideDeleteContact", "deleteContactByID"]),
    removeContact() {
      this.isShowContent = false;

      setTimeout(() => {
        this.deleteContactByID(this.dataDeleteContact.id);
        this.hideDeleteContact();
      }, 150);
    },
    hiddenContact() {
      this.isShowContent = false;

      setTimeout(() => {
        this.hideDeleteContact();
      }, 150);
    },
  },
  mounted() {
    this.isShowContent = true;
  },
};
</script>

<style lang="scss" scoped>
.delete-contact {
  width: 100%;
  height: 100%;
  z-index: 9990;
  position: fixed;
  top: 0;
  left: 0;

  &-enter,
  &-leave-to {
    opacity: 0;
  }

  &-enter-active,
  &-leave-active {
    transition: 0.15s linear;
  }

  &-enter-to,
  &-leave {
    opacity: 1;
  }

  &__overlay {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 0;
    left: 0;
  }

  &__content {
    width: 260px;
    height: 190px;
    background: #fff;
    box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.1);
    transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
    left: 50%;

    &-enter,
    &-leave-to {
      opacity: 0;
      transform: translate(-50%, -70%);
    }

    &-enter-active,
    &-leave-active {
      transition: 0.15s linear;
    }

    &-enter-to,
    &-leave {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }

  &__userpic {
    width: 100px;
    height: 100px;
    background: #fff;
    box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transform: translateX(-50%);
    position: absolute;
    top: -50px;
    left: 50%;

    img {
      width: 100px;
      height: 100px;
      vertical-align: middle;
    }

    h1 {
      text-transform: uppercase;
      text-align: center;
      line-height: 100px;
      color: #2d2d2d;
      font-size: 58px;
    }
  }

  &__fullname {
    width: 100%;
    height: 40px;
    overflow: hidden;
    padding: 0 10px;
    position: absolute;
    top: 60px;
    left: 0;

    h2 {
      text-align: center;
      line-height: 40px;
      color: #2d2d2d;
      font-size: 14px;
      font-weight: 500;
    }
  }

  &__question {
    width: 100%;
    height: 40px;
    overflow: hidden;
    padding: 0 10px;
    position: absolute;
    top: 100px;
    left: 0;

    p {
      text-align: center;
      line-height: 20px;
      color: #2d2d2d;
      font-size: 12px;
    }
  }

  &__confirm,
  &__cancel {
    width: 50%;
    height: 40px;
    background: #fff;
    overflow: hidden;
    cursor: pointer;
    color: #2d2d2d;
    font-size: 12px;
    position: absolute;
    bottom: 0;
  }

  &__confirm {
    border-radius: 0 0 0 5px;
    color: #f00;
    left: 0;

    &:hover {
      background: #f00;
      color: #fff;
    }
  }

  &__cancel {
    border-radius: 0 0 5px 0;
    right: 0;
  }
}
</style>
