<template>
  <div id="app">
    <header class="header">
      <router-link
        to="/"
        class="header__back"
        v-bind:class="{ header__back_active: isBackContacts }"
      />

      <div
        class="header__title"
        v-bind:class="{ header__title_active: isBackContacts }"
      >
        <h3>Contacts</h3>
      </div>
    </header>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    isBackContacts: false,
  }),
  updated() {
    if (this.$route.name === "contact") {
      this.isBackContacts = true;
    } else {
      this.isBackContacts = false;
    }
  },
};
</script>

<style lang="scss">
$mainFonts: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
  Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

* {
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  resize: none;
  box-sizing: border-box;
}

a {
  text-decoration: none;
}

.b5radius {
  border-radius: 5px;
}

.b50radius {
  border-radius: 50%;
}

.transition {
  transition: 0.15s linear;
}

#app {
  font-family: $mainFonts;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.header {
  width: 100%;
  height: 50px;
  background: #fff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;

  &__back {
    width: 30px;
    height: 30px;
    visibility: hidden;
    position: absolute;
    top: 10px;
    left: 20px;

    &:before {
      content: "";
      width: 16px;
      height: 16px;
      background: url("assets/img/icons/arrow_left.svg") center no-repeat;
      transition: 0.1s linear;
      transform: translate(-50%, -50%);
      position: absolute;
      top: 50%;
      left: 50%;
    }

    &_active {
      visibility: visible;
    }
  }

  &__title {
    height: 30px;
    position: absolute;
    transition: 0.15s linear;
    top: 10px;
    left: 20px;

    &_active {
      left: 60px;
    }

    h3 {
      line-height: 30px;
      color: #2d2d2d;
      font-size: 14px;
      font-family: $mainFonts;
    }
  }
}
</style>
