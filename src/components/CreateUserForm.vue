<script setup>
import { generatePassword } from '@/utils/functions'
import { ref } from 'vue'

const email = ref('')
const password = ref('')
</script>

<template>
  <form class="create-user">
    <div class="user">
      <div>
        <label class="email-label" for="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          v-model="email"
          placeholder="digite o email aqui..."
          required
        />
      </div>
      <div>
        <label for="password">Senha:</label>
        <input
          name="password"
          id="password"
          v-model="password"
          placeholder="digite a senha aqui..."
          required
        />
        <button @click="() => (password = generatePassword())" type="button">Gerar Senha</button>
      </div>
    </div>
  </form>
</template>

<style scoped>
.create-user {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--gray-color-10);
  gap: 16px;
  color: var(--white-color);
  padding: 16px;
  border-radius: 4px;
  width: 100%;

  > .user {
    background-color: var(--gray-color-20);
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    border-radius: 4px;
    font-size: 20px;
    width: 100%;

    > div {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 37.5%;

      > label {
        font-weight: bold;
      }

      > .email-label {
        padding-left: 7px;
      }

      > input {
        padding: 6px 8px 4px;
        border-radius: 4px;
        border-color: transparent;
        font-size: 16px;
        width: 100%;
      }

      > button {
        padding: 6px 8px;
        text-transform: uppercase;
        border-radius: 4px;
        border-color: transparent;
        font-size: 14px;
        font-weight: bold;
        width: 212px;
        background-color: var(--yellow-color-50);

        &:hover {
          cursor: pointer;
          background-color: var(--yellow-color-40);
        }

        &:active {
          background-color: var(--yellow-color-60);
        }
      }
    }
  }
}
</style>
