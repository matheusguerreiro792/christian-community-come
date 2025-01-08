<script setup>
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user'

const user = useUserStore()
</script>

<template>
  <nav>
    <RouterLink to="/" active-class="active">Home</RouterLink>
    <RouterLink v-if="user.isAuthenticated" to="/profile" active-class="active">Perfil</RouterLink>
    <RouterLink v-if="user.isAuthenticated" to="/login" @click="user.handleLogout">Sair</RouterLink>
    <RouterLink v-else to="/login" active-class="active">Entrar</RouterLink>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: center;
  background-color: #100;
  gap: 16px;
  padding: 12px 0;

  > a {
    text-decoration: none;
    color: var(--white-color);
    font-weight: bold;
    font-size: 18px;

    &:hover {
      text-decoration: underline;
    }
  }

  .active {
    color: #0f0;
  }
}
</style>
