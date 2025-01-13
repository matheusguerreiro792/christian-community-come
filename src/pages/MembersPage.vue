<script setup>
import MembersTable from '@/components/MembersTable.vue'
import CreateUserForm from '@/components/CreateUserForm.vue'
import { ref } from 'vue'

const formVisible = ref(false)

const toggleForm = () => {
  formVisible.value = !formVisible.value
}
</script>

<template>
  <main>
    <button @click="toggleForm"><i class="material-icons">add</i>Adicionar</button>
    <CreateUserForm v-if="formVisible" />
    <MembersTable />
  </main>
</template>

<style scoped>
main {
  background-color: var(--gray-color-20);
  padding: 16px 24px;
  gap: 16px;
  align-items: center;

  > button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    padding: 8px 12px;
    font-size: 16px;
    background-color: var(--green-color-30);
    color: var(--white-color);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;

    > i {
      margin-right: 4px;
    }

    &:hover {
      background-color: var(--green-color-20);
    }

    &:active {
      background-color: var(--green-color-40);
    }
  }
}
</style>
