<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import router from '@/router'

const email = ref('')
const password = ref('')

const user = useUserStore()

const handleLogin = async () => {
  try {
    await user.logIn(email.value, password.value)
    router.push('/profile')
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <form class="login-form" @submit.prevent="handleLogin">
    <div class="email">
      <label for="email">Email:</label>
      <input
        type="email"
        name="email"
        id="email"
        v-model="email"
        placeholder="seuemail@aqui.com.br"
        required
      />
    </div>
    <div class="password">
      <label for="password">Senha:</label>
      <input
        type="password"
        name="password"
        id="password"
        v-model="password"
        placeholder="sua senha aqui"
        required
      />
    </div>

    <button type="submit">Entrar</button>
  </form>
</template>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #200;
  color: var(--white-color);
  padding: 64px;
  gap: 32px;
  border-radius: 8px;

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;

    > label {
      font-size: 18px;
      font-weight: bold;
    }

    > input {
      padding: 4px 8px;
      border-radius: 8px;
      border-color: transparent;
      font-size: 16px;
    }
  }

  > button {
    padding: 8px;
    border-radius: 8px;
    margin-top: 24px;
    border-color: transparent;
    background-color: #080;
    color: var(--white-color);
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    text-transform: uppercase;

    &:hover {
      background-color: #0a0;
    }
  }
}
</style>
