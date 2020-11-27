<template>
  <div class="create-contact">
    <div class="create-contact__overlay" v-on:click="hiddenCreateContact"></div>

    <transition name="create-contact__content">
      <div v-if="isShowContent" class="create-contact__content b5radius">
        <div class="create-contact__userpic b50radius">
          <img
            v-if="!useNameUserpic"
            v-bind:src="
              require(`../../assets/img/userpic/${randomUserpic}.svg`)
            "
            alt=""
          />

          <div
            v-if="!useNameUserpic"
            class="create-contact__changeuserpic transition"
            v-on:click="changeUserpic"
          ></div>

          <h1 v-if="useNameUserpic">
            {{ contact.name.slice(0, 1).toUpperCase() }}
          </h1>
        </div>

        <div
          class="create-contact__usename"
          v-on:click="useNameUserpic = !useNameUserpic"
          v-bind:class="{ 'create-contact__usename_active': useNameUserpic }"
        >
          <p class="transition">Использовать Имя</p>
          <div class="create-contact__swith transition">
            <div class="create-contact__slider b50radius transition"></div>
          </div>
        </div>

        <input
          type="text"
          class="create-contact__name"
          placeholder="Имя"
          maxlength="30"
          v-bind:class="{ 'create-contact__name_error': isErrorName }"
          v-model.trim="contact.name"
          v-on:focus="isTouchedName = true"
        />

        <input
          type="text"
          class="create-contact__lastname"
          placeholder="Фамилия"
          maxlength="30"
          v-model.trim="contact.lastname"
        />

        <input
          type="text"
          class="create-contact__phone"
          placeholder="Телефон"
          maxlength="11"
          v-bind:class="{ 'create-contact__phone_error': isErrorPhone }"
          v-model.trim="contact.phone"
          v-on:focus="isTouchedPhone = true"
        />

        <button class="create-contact__save b5radius" v-on:click="saveContact">
          Сохранить
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "CreateContact",
  data: () => ({
    isShowContent: false,
    randomUserpic: 1,
    useNameUserpic: false,
    isTouchedName: false,
    isTouchedPhone: false,
    isErrorName: false,
    isErrorPhone: false,
    isValidName: false,
    isValidPhone: false,
    contact: {
      name: "",
      lastname: "",
      phone: "",
    },
  }),
  watch: {
    contact: {
      deep: true,
      handler(val) {
        if (/^[a-zа-я]{1,30}$/i.test(val.name)) {
          this.isErrorName = false;
          this.isValidName = true;
        } else {
          this.isValidName = false;

          if (this.isTouchedName) {
            this.isErrorName = true;
          }
        }

        if (/^[0-9]{11}$/i.test(val.phone)) {
          this.isValidPhone = true;
          this.isErrorPhone = false;
        } else {
          this.isValidPhone = false;

          if (this.isTouchedPhone) {
            this.isErrorPhone = true;
          }
        }
      },
    },
  },
  methods: {
    ...mapActions(["toggleShowCreateContact", "createContact"]),
    changeUserpic() {
      let newUserpic = Math.floor(Math.random() * 10) + 1;

      if (this.randomUserpic === newUserpic) {
        this.changeUserpic();
      } else {
        this.randomUserpic = newUserpic;
      }
    },
    hiddenCreateContact() {
      this.isShowContent = false;

      setTimeout(() => {
        this.toggleShowCreateContact();
      }, 150);
    },
    clearData() {
      this.useNameUserpic = false;
      this.isTouchedName = false;
      this.isTouchedPhone = false;
      this.isErrorName = false;
      this.isErrorPhone = false;
      this.isValidName = false;
      this.isValidPhone = false;
      this.contact.name = "";
      this.contact.lastname = "";
      this.contact.phone = "";
    },
    saveContact() {
      if (this.isValidName && this.isValidPhone) {
        const contact = {
          id: Date.now(),
          userpic: this.randomUserpic,
          useNameUserpic: this.useNameUserpic,
          name: this.contact.name,
          lastname: this.contact.lastname,
          phone: this.contact.phone,
        };

        this.createContact(contact);
        this.clearData();
        this.hiddenCreateContact();
      }
    },
  },
  mounted() {
    this.isShowContent = true;
    this.changeUserpic();
  },
};
</script>

<style lang="scss" scoped>
.create-contact {
  width: 100%;
  height: 100%;
  z-index: 2;
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
    height: 310px;
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

  &__changeuserpic {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
    overflow: hidden;
    opacity: 0;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;

    &:before {
      content: "";
      width: 16px;
      height: 16px;
      background: url("../../assets/img/icons/refresh.svg") center no-repeat;
      transition: 0.15s linear;
      margin: -8px 0 0 -8px;
      position: absolute;
      top: 50%;
      left: 50%;
    }

    &:active:before {
      transform: rotate(360deg);
    }
  }

  &__userpic:hover &__changeuserpic {
    opacity: 1;
  }

  &__usename {
    width: 154px;
    height: 20px;
    cursor: pointer;
    transform: translateX(-50%);
    position: absolute;
    top: 70px;
    left: 50%;

    p {
      line-height: 20px;
      color: #ccc;
      font-size: 12px;
    }

    &_active p {
      color: #2d2d2d;
    }
  }

  &__swith {
    width: 40px;
    height: 20px;
    background: #f8f8f8;
    box-shadow: inset 0 0 1px 0 rgba(0, 0, 0, 0.05);
    border-radius: 12px;
    position: absolute;
    top: 0;
    right: 0;
  }

  &__usename_active &__swith {
    background: #0075ff;
  }

  &__slider {
    width: 12px;
    height: 12px;
    background: #fff;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    position: absolute;
    top: 4px;
    left: 4px;
  }

  &__usename_active &__slider {
    left: 24px;
  }

  &__name,
  &__lastname,
  &__phone {
    width: 240px;
    height: 40px;
    background: #f8f8f8;
    padding: 0 10px;
    text-align: center;
    color: #2d2d2d;
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    position: absolute;
    left: 10px;
  }

  &__name {
    border-radius: 5px 5px 0 0;
    top: 110px;

    &_error {
      background: rgb(255, 91, 91, 0.15);
    }
  }

  &__lastname {
    top: 150px;
  }

  &__phone {
    border-radius: 0 0 5px 5px;
    top: 190px;

    &_error {
      background: rgb(255, 91, 91, 0.15);
    }
  }

  &__save {
    width: 120px;
    height: 40px;
    background: #0075ff;
    cursor: pointer;
    color: #fff;
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    transform: translateX(-50%);
    position: absolute;
    top: 250px;
    left: 50%;
  }
}
</style>
