<template>
  <div class="login container">
    <form @submit.prevent="login" class="card-panel">
      <h2 class="center deep-purple-text">Login</h2>
      <div class="field">
        <label for="email">
          Email:
          <input type="email" name="email" v-model="email">
        </label>
      </div>
      <div class="field">
        <label for="password">
          Password:
          <input type="password" name="password" v-model="password">
        </label>
      </div>
      <p class="center red-text" v-if="feedback">{{ feedback }}</p>
      <div class="field center">
        <button class="btn deep-purple">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from '@/firebase/init'

export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      feedback: null
    }
  },
  methods: {
    async login() {
      if (this.email && this.password) {
        this.feedback = null
        try {
          const user = await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          await this.$router.push({name: 'GMap'})
        } catch (e) {
          console.error(e)
          this.feedback = e.message
        }
      } else {
        this.feedback = "Please fill in both fields"
      }

    }
  }
}
</script>

<style scoped>
.login {
  max-width: 400px;
  margin-top: 60px;
}

.login h2 {
  font-size: 2.4em;
}

.login .field {
  margin-bottom: 16px;
}
</style>
