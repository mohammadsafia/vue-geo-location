<template>
  <div class="view-profile container">
    <div v-if="profile" class="card">
      <h2 class="deep-purple-text center">{{ profile.alias }}'s Wall</h2>
      <ul class="comments collection">
        <li v-for="(comment,index) in comments" :key="index">
          <div class="deep-purple-text">{{ comment.from }}</div>
          <div class="grey-text text-darken-2">{{ comment.content }}</div>
        </li>
      </ul>
      <form @submit.prevent="addComment">
        <div class="field">
          <label for="comment">
            Comment:
            <input type="text" name="comment" v-model="newComment">
          </label>
          <p v-if="feedback" class="red-text center">{{ feedback }}</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from '@/firebase/init'

export default {
  name: "ViewProfile",
  data() {
    return {
      profile: null,
      newComment: null,
      feedback: null,
      user: null,
      comments: []
    }
  },
  created() {
    let ref = firebase.firestore().collection('users')
    // get current user
    this.getCurrentUser(ref)
    // profile data
    this.getProfileData(ref)
    // comments
    this.getComments()
  },
  methods: {
    addComment() {
      if (this.newComment) {
        this.feedback = null
        firebase.firestore().collection('comments').add({
          to: this.$route.params.id,
          from: this.user.alias,
          content: this.newComment,
          time: Date.now()
        }).then(() => {
          this.newComment = null
        })

      } else {
        this.feedback = "You must enter a comment to add it"
      }
    },
    getComments() {
      firebase.firestore().collection('comments').where('to', '==', this.$route.params.id).onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            this.comments.unshift({
              from: change.doc.data().from,
              content: change.doc.data().content
            })
          }
        })
      })
    },
    getProfileData(ref) {
      ref.doc(this.$route.params.id).get()
        .then(user => {
          this.profile = user.data()
        })
    },
    getCurrentUser(ref) {
      ref.where('user_id', '==', firebase.auth().currentUser.uid).get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.user = doc.data()
            this.user.id = doc.id
          })
        })
    }
  }
}
</script>

<style scoped>
  .view-profile .card{
    padding: 20px;
    margin-top: 60px;
  }
  .view-profile h2 {
    font-size: 2em;
    margin-top: 0;
  }
  .view-profile li{
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
</style>
