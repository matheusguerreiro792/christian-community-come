<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer>
    <span>&copy; {{ year }} Comunidade Cristã Vinde</span>
  </footer>
</template>

<style scoped>
footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
  color: var(--white-color);
  background-color: #100;
}
</style>
