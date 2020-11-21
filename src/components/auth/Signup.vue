<template>
  <div class="signup container">
    <form @submit.prevent="signup" class="card-panel">
      <h2 class="center deep-purple-text">Signup</h2>
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
      <div class="field">
        <label for="alias">
          Alias:
          <input type="text" name="alias" v-model="alias">
        </label>
      </div>
      <p class="center red-text" v-if="feedback">{{ feedback }}</p>
      <div class="field center">
        <button class="btn deep-purple">Signup</button>
      </div>
    </form>
  </div>
</template>

<script>
import slugify from 'slugify'
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
  name: "Signup",
  data() {
    return {
      email: null,
      password: null,
      alias: null,
      feedback: null,
      slug: null
    }
  },
  methods: {
    signup() {
      if (this.alias && this.email && this.password) {
        this.getSlugify();
        let ref = db.firestore().collection('users').doc(this.slug)
        this.checkAliasAndCreateUserWithEmailAndPassword(ref)
      } else {
        this.feedback = 'You must enter all fields'
      }
    },
    getSlugify() {
      this.slug = slugify(this.alias, {
        replacement: "-",
        remove: /[$*_+~.()'"!\-:@]/g,
        lower: true
      })
    },
    async checkAliasAndCreateUserWithEmailAndPassword(ref) {
      await this.checkAlias(ref)
      await this.createUser(ref)
    },
    async createUser(ref) {
      try {
        const user = await firebase.auth().createUserWithEmailAndPassword(this.email, this.password);
        ref.set({alias: this.alias, geolocation: null, user_id: user.user.uid})
        await this.$router.push({name: 'GMap'})
      } catch (e) {
        console.error(e);
        this.feedback = e.message
      }
    },
    async checkAlias(ref) {
      try {
        const doc = await ref.get()
        if (doc.exists)
          this.feedback = 'This alias already exists'
        else
          this.feedback = "This alias is free to use"
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style scoped>
.signup {
  max-width: 400px;
  margin-top: 60px;
}

.signup h2 {
  font-size: 2.4em;
}

.signup .field {
  margin-bottom: 16px;
}
</style>
