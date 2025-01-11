<script setup>
import { useProfileStore } from '@/stores/profile'

const profileStore = useProfileStore()

const profiles = profileStore.profiles
</script>

<template>
  <table v-if="profiles" class="members-table">
    <thead>
      <tr>
        <th>Nome</th>
        <th>Telefone</th>
        <th>Papel</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="profile in profiles" :key="profile.id">
        <td>{{ profile.name }}</td>
        <td>{{ profile.phone }}</td>
        <td>{{ profile.role }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.members-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 4px;
  overflow: hidden;

  > thead {
    background-color: var(--gray-color-10);
    color: var(--white-color);

    > tr {
      > th {
        text-align: left;
        padding: 10px 16px;
      }
    }
  }

  > tbody {
    > tr {
      > td {
        background-color: var(--gray-color-90);
        padding: 4px 16px;
      }

      &:hover {
        > td {
          background-color: var(--white-color);
          cursor: pointer;
        }
      }
    }
  }
}
</style>
