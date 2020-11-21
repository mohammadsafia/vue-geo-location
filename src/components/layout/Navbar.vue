<template>
  <div class="navbar">
    <nav class="deep-purple darken-1">
      <div class="container">
        <router-link :to="{name:'GMap'}" class="brand-logo left">GeoVue!</router-link>
        <ul class="right">
          <li v-if="!user">
            <router-link :to="{name:'Signup'}" href="">Signup</router-link>
          </li>
          <li v-if="!user">
            <router-link :to="{name:'Login'}" href="">Login</router-link>
          </li>
          <li v-if="user"><a @click="logout">{{ user.email }}</a></li>
          <li v-if="user"><a @click="logout">Logout</a></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from "@/firebase/init"

export default {
  name: "Navbar",
  data() {
    return {
      user: null
    }
  },
  methods: {
    async logout() {
      try {
        await firebase.auth().signOut()
        await this.$router.push({name: 'Login'})
      } catch (e) {
        console.error(e);
      }
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user
      } else {
        this.user = null
      }
    })
  }
}
</script>

<style scoped>

</style>
