<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.isFooterGuideShow"></FooterGuide>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide'
export default {
  name: "App",
  components: {
    FooterGuide,
  },
  mounted() {
    this.$store.dispatch('getAddress');
    this.$store.dispatch("login_auto");
  },
};
</script>

<style lang="stylus">

</style>
