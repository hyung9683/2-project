<template>
  <div>
  <nav class="navbar navbar-expand-md navbar-light">
          <button class="navbar-toggler ml-auto mb-2 bg-light" type="button" data-toggle="collapse" data-target="#sidebar">
              <span class="navbar-toggle-icon"></span>
          </button>
      <Header class="header" ref="header" />
          <menu-layout class="menu"></menu-layout>
  </nav>
         <!-- 현재 위치 -->
          <nav class="navbar navbar-expand-md navbar-light bg-body-tertiary position-relative" style="top: 3rem; height:2rem;">
            <div class="col-md-4">
                    <div class="location-bar">
                        <button type="button" class="btn">
                            <div @click="Home()">Home</div>
                        </button>
                        <i class="bi bi-caret-right align-middle"></i>
                        <button type="button">
                          <div @click="MenuList()">{{Menu}}</div>
                        </button>
                    </div>
            </div>
        </nav>
      <router-view />
  </div>
</template>

<script>

import Header from './header.vue'
import MenuLayout from './MenuLayout.vue'

export default {
  components: {Header, MenuLayout},
  data() {
  return {
    Menu:'',
  }
}, 
  mounted() {},
  computed: {},
  methods: {
  //   MenuList() {
  //     if(this.$router.push({path: '/Han'}))
  //   },
   }
}
</script>
<style scoped>

.header {
  z-index: 999;

}

.menu {
  z-index: 1;
}
</style>