<template>
  <div
    class="btn-create b50radius transition"
    v-on:click="toggleShowCreateContact"
    v-bind:class="{
      'btn-create_show': isShowBtnContact,
      'btn-create_active': isShowCreateContact,
    }"
  ></div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "BtnCreate",
  data: () => ({
    isShowBtnContact: true,
  }),
  computed: {
    ...mapGetters(["isShowCreateContact"]),
  },
  methods: {
    ...mapActions(["toggleShowCreateContact"]),
  },
  mounted() {
    let lastScroll = 0;

    document.addEventListener("scroll", () => {
      if (!this.isShowCreateContact) {
        let thisScroll = Math.floor(document.documentElement.scrollTop);

        if (lastScroll >= thisScroll + 1) {
          this.isShowBtnContact = true;
        } else {
          if (thisScroll >= 100) {
            this.isShowBtnContact = false;
          }
        }

        lastScroll = thisScroll;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.btn-create {
  width: 40px;
  height: 40px;
  background: #fff;
  box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  z-index: 3;
  transform: translate(-50%, 10px);
  position: fixed;
  bottom: 20px;
  left: 50%;

  &:active {
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  }

  &:before {
    content: "";
    width: 16px;
    height: 16px;
    background: url("../../assets/img/icons/add.svg") center no-repeat;
    transition: 0.1s linear;
    margin: -8px 0 0 -8px;
    position: absolute;
    top: 50%;
    left: 50%;
  }

  &_active:before {
    transform: rotate(45deg);
  }

  &_show {
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, 0);
  }
}
</style>
