<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <header>
    <h1>Comunidade Cristã Vinde</h1>
  </header>

  <main></main>

  <footer>
    <span>&copy; {{ year }} Comunidade Cristã Vinde</span>
  </footer>
</template>

<style scoped>
header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 0;
  background-color: #500;
  color: var(--white-color);

  > h1 {
    font-size: 32px;
  }
}
main {
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #f8f9fa;
}

footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
  color: #fff;
  background-color: #100;
}
</style>
