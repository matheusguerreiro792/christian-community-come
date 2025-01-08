<script setup>
import HeaderComponent from './components/HeaderComponent.vue'
import NavComponent from './components/NavComponent.vue'
import FooterComponent from './components/FooterComponent.vue'

import { RouterView } from 'vue-router'
</script>

<template>
  <HeaderComponent />
  <NavComponent />
  <RouterView />
  <FooterComponent />
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>
