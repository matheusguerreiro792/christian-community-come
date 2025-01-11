<script setup>
defineProps({
  profile: {
    type: Object,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="profile-component">
    <div class="photo-name">
      <img :src="profile.photo" alt="Foto do Perfil" />
      <h2>{{ profile.name }}</h2>
    </div>
    <div class="email">
      <label>Email:</label>
      <span>{{ email }}</span>
    </div>
    <div class="phone">
      <label>Telefone:</label>
      <span>{{ profile.phone }}</span>
    </div>
  </div>
</template>

<style scoped>
.profile-component {
  color: darkblue;
  background-color: lightblue;

  > .photo-name {
    display: flex;
    align-items: center;
  }
}
</style>
