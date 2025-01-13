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
        <th class="center">Editar</th>
        <th class="center">Remover</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="profile in profiles" :key="profile.id">
        <td>{{ profile.name }}</td>
        <td>{{ profile.phone }}</td>
        <td>{{ profile.role }}</td>
        <td><i class="material-icons edit">edit</i></td>
        <td><i class="material-icons delete">delete</i></td>
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

        > i {
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          width: fit-content;
          margin: auto;
        }

        > i.edit {
          &:hover {
            color: var(--green-color-30);
          }
        }

        > i.delete {
          &:hover {
            color: var(--red-color-40);
          }
        }
      }

      &:hover {
        > td {
          background-color: var(--white-color);
        }
      }
    }
  }

  .center {
    text-align: center;
  }
}
</style>
