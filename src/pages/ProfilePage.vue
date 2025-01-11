<script setup>
import { useUserStore } from '@/stores/user'
import ProfileComponent from '@/components/ProfileComponent.vue'

const user = useUserStore()
</script>

<template>
  <main v-if="user.userLoaded">
    <ProfileComponent :profile="user.profile" :email="user.user.email" />
  </main>
</template>

<style scoped></style>
