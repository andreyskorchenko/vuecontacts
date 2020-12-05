<template>
  <div class="contact">
    <div class="contact-card b5radius">
      <div class="contact-card__userpic b50radius">
        <img
          v-if="!contact.useNameUserpic"
          v-bind:src="require(`../assets/img/userpic/${contact.userpic}.svg`)"
          v-bind:alt="`${contact.name} ${contact.lastname}`"
        />

        <h1 v-if="contact.useNameUserpic">
          {{ contact.name.slice(0, 1).toUpperCase() }}
        </h1>
      </div>

      <div class="contact-card__fullname">
        <h2>{{ `${contact.name} ${contact.lastname}` }}</h2>
      </div>

      <div class="contact-card__phone">
        <p>{{ contact.phone }}</p>
      </div>
    </div>

    <div class="contact-info">
      <div class="contact-info__inputs">
        <ContactItem
          v-for="(value, name) in getInputs()"
          v-bind:key="name"
          v-bind:id="contact.id"
          v-bind:value="value"
          v-bind:name="name"
        />
      </div>

      <div class="contact-create">
        <div class="contact-create__add" v-on:click="add"></div>

        <input
          type="text"
          class="contact-create__name"
          placeholder="Имя"
          v-model="input.name"
        />

        <div class="contact-create__border"></div>

        <input
          type="text"
          class="contact-create__value"
          placeholder="Значение"
          v-model="input.value"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ContactItem from "../components/contact/ContactItem";

export default {
  name: "Contact",
  components: {
    ContactItem,
  },
  data: () => ({
    contact: {},
    input: {
      name: "",
      value: "",
    },
  }),
  computed: {
    ...mapGetters(["contacts"]),
  },
  methods: {
    ...mapActions(["addNewInput"]),
    getInputs() {
      const inputs = {};
      const ignore = ["id", "userpic", "useNameUserpic"];

      for (let key in this.contact) {
        if (!ignore.includes(key)) {
          inputs[key] = this.contact[key];
        }
      }

      return inputs;
    },
    add() {
      if (this.input.name.length && this.input.value.length) {
        this.addNewInput({
          id: this.contact.id,
          name: this.input.name,
          value: this.input.value,
        });

        this.input.name = this.input.value = "";
      }
    },
  },
  created() {
    this.contact = this.contacts.filter(
      (c) => c.id == this.$route.params.id
    )[0];
  },
};
</script>

<style lang="scss" scoped>
$font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
  Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

.contact {
  width: 100%;
  height: auto;
  background: #fff;
  overflow: hidden;
}

.contact-card {
  width: 220px;
  height: 150px;
  background: #fff;
  box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.1);
  padding: 70px 10px 0 10px;
  position: fixed;
  top: 120px;
  left: 20px;

  @media screen and (max-width: 680px) {
    width: 100%;
    box-shadow: none;
    position: relative;
    left: 0;
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

    @media screen and (max-width: 680px) {
      box-shadow: none;
    }

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

    h2 {
      text-align: center;
      line-height: 40px;
      color: #2d2d2d;
      font-size: 14px;
      font-weight: 500;
    }
  }

  &__phone {
    width: 100%;
    height: 20px;
    overflow: hidden;

    p {
      text-align: center;
      line-height: 20px;
      color: #999;
      font-size: 14px;
      font-weight: 500;
    }
  }
}

.contact-info {
  width: calc(100% - 260px);
  height: auto;
  overflow: hidden;
  margin-left: 260px;
  padding: 70px 20px 20px 20px;

  @media screen and (max-width: 680px) {
    width: 100%;
    margin-top: 120px;
    margin-left: 0;
    padding: 20px;
  }

  &__inputs {
    width: 100%;
    height: auto;
    overflow: hidden;
  }
}

.contact-create {
  width: 100%;
  background: #fff;
  height: 40px;
  display: flex;
  overflow: hidden;
  margin-top: 20px;
  padding: 0 20px 0 30px;
  position: relative;

  &:after {
    content: "";
    width: calc(100% - 60px);
    height: 1px;
    background: #f4f4f4;
    position: absolute;
    bottom: 0;
    left: 30px;
  }

  &__add {
    width: 30px;
    height: 40px;
    overflow: hidden;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;

    &:before {
      content: "";
      width: 16px;
      height: 16px;
      background: url(../assets/img/icons/create.svg) center no-repeat;
      transform: translate(-50%, -50%);
      position: absolute;
      top: 50%;
      left: 50%;
    }

    &:after {
      content: "";
      width: 1px;
      height: 20px;
      background: #f4f4f4;
      transform: translateY(-50%);
      position: absolute;
      top: 50%;
      right: 0;
    }
  }

  &__name {
    width: 80px;
    padding: 0 10px;
    color: #2d2d2d;
    font-size: 12px;
    font-weight: bold;
    font-family: $font;
  }

  &__border {
    width: 1px;
    height: 20px;
    background: #f4f4f4;
    margin-top: 10px;
  }

  &__value {
    width: 100%;
    padding: 0 10px;
    color: #2d2d2d;
    font-size: 14px;
    font-family: $font;
  }
}
</style>
