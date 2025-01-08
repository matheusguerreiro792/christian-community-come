<script setup>
import { useUserStore } from '@/stores/user'

const user = useUserStore()
</script>

<template>
  <main>
    <h1>Perfil</h1>
    <p v-if="user.userLoaded">Usuário: {{ user.user }}</p>
    <p v-if="user.userLoaded">Perfil: {{ user.profile }}</p>
    <p v-if="user.userLoaded">isAuthenticated: {{ user.isAuthenticated }}</p>
    <p v-if="user.userLoaded">isAdmin: {{ user.isAdmin }}</p>
    <p v-if="user.userLoaded">isPastor: {{ user.isPastor }}</p>
    <p v-if="user.userLoaded">isLeader: {{ user.isLeader }}</p>
    <p v-if="user.userLoaded">isMember: {{ user.isMember }}</p>
  </main>
</template>

<style scoped></style>
