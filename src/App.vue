<template>
  <AppHeader />
  <router-view />
</template>

<style lang="scss">
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>


<script lang="ts">
import { defineComponent } from "vue";
import AppHeader from "@/components/AppHeader.vue"; // @ is an alias to /src

export default defineComponent({
  name: "App",
  components: {
    AppHeader,
  },
});
</script>

