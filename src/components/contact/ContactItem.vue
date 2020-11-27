<template>
  <div class="contact-info__input">
    <div
      class="contact-info__wrapper transition"
      v-bind:class="{ 'contact-info__wrapper_active': isRemove }"
    >
      <div
        class="contact-info__remove"
        v-if="name !== 'name'"
        v-on:click="isRemove = !isRemove"
      ></div>

      <div class="contact-info__name">
        <p>{{ name.slice(0, 1).toUpperCase() + name.slice(1) }}</p>
      </div>

      <input
        type="text"
        class="contact-info__value"
        v-model="newValue"
        v-on:focus="focusInput"
        v-on:keyup="changeInput"
      />

      <button
        class="contact-info__reset"
        v-if="isBack"
        v-on:click="reset"
      ></button>

      <button
        class="contact-info__save"
        v-if="isUpdate"
        v-on:click="save"
      ></button>
    </div>

    <button
      class="contact-info__delete"
      v-on:click="deleteInput(name)"
    ></button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ContactItem",
  props: {
    id: {
      type: Number,
    },
    value: {
      type: String,
      default: () => "",
    },
    name: {
      type: String,
      default: () => "",
    },
  },
  data: () => ({
    isRemove: false,
    isBack: false,
    isUpdate: false,
    oldValue: "",
    newValue: "",
  }),
  methods: {
    ...mapActions(["removeContactInput", "updateInput"]),
    deleteInput(name) {
      this.removeContactInput({
        id: this.id,
        name,
      });
    },
    focusInput() {
      this.isRemove = false;
    },
    changeInput() {
      if (this.newValue != this.value) {
        this.isUpdate = true;
      } else {
        this.isUpdate = false;
      }

      if (this.oldValue != this.newValue) {
        this.isBack = true;
      } else {
        this.isBack = false;
      }
    },
    reset() {
      this.updateInput({
        id: this.id,
        name: this.name,
        value: this.oldValue,
      });

      this.newValue = this.oldValue;

      setTimeout(() => {
        this.isBack = false;
        this.isUpdate = false;
      }, 150);
    },
    save() {
      this.updateInput({
        id: this.id,
        name: this.name,
        value: this.newValue,
      });

      setTimeout(() => (this.isUpdate = false), 150);
    },
  },
  created() {
    this.oldValue = this.newValue = this.value;
  },
};
</script>

<style lang="scss" scoped>
$font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
  Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

.contact-info__input {
  width: 100%;
  background: #fff;
  height: 40px;
  overflow: hidden;
  position: relative;

  &:not(:first-child) {
    margin-top: 20px;
  }
}

.contact-info__wrapper {
  background: #fff;
  display: flex;
  padding: 0 30px 0 30px;
  z-index: 1;
  position: relative;

  &:after {
    content: "";
    width: calc(100% - 20px);
    height: 1px;
    background: #f4f4f4;
    position: absolute;
    bottom: 0;
    left: 10px;
  }

  &_active {
    transform: translateX(-30px);
  }
}

.contact-info__remove {
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
    background: url(../../assets/img/icons/remove.svg) center no-repeat;
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

.contact-info__name {
  width: 100px;
  padding: 0 0 0 10px;
  flex-shrink: 0;
  line-height: 40px;
  color: #2d2d2d;
  font-size: 12px;
  font-weight: bold;
  font-family: $font;
  position: relative;

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

.contact-info__value {
  width: 100%;
  padding: 0 10px;
  color: #2d2d2d;
  font-size: 14px;
  font-family: $font;
}

.contact-info__reset {
  width: 25px;
  height: 40px;
  background: #fff;
  overflow: hidden;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 25px;

  &:before {
    content: "";
    width: 16px;
    height: 16px;
    background: url(../../assets/img/icons/back.svg) center no-repeat;
    transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
    left: 50%;
  }

  &:active:before {
    transform: translate(-60%, -50%);
  }
}

.contact-info__save {
  width: 25px;
  height: 40px;
  background: #fff;
  overflow: hidden;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;

  &:before {
    content: "";
    width: 16px;
    height: 16px;
    background: url(../../assets/img/icons/update.svg) center no-repeat;
    transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
    left: 50%;
  }

  &:active:before {
    transform: translate(-50%, -40%);
  }
}

.contact-info__delete {
  width: 30px;
  height: 40px;
  background: #fff;
  overflow: hidden;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;

  &:before {
    content: "";
    width: 16px;
    height: 16px;
    background: url(../../assets/img/icons/delete_red.svg) center no-repeat;
    transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
    left: 50%;
  }
}
</style>
