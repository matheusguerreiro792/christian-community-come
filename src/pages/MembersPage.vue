<script setup>
import MembersTable from '@/components/MembersTable.vue'
</script>

<template>
  <main>
    <h2>Membros</h2>
    <MembersTable />
  </main>
</template>

<style scoped>
main {
  background-color: var(--gray-color-20);
  padding: 16px 24px;
  gap: 16px;

  > h2 {
    color: var(--white-color);
  }
}
</style>
