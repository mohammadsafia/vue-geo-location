<template>
  <div class="map">
    <div class="google-map" id="map"></div>
  </div>
</template>

<script>
import firebase from '@/firebase/init'

export default {
  name: "GMap",
  data() {
    return {
      lat: 53,
      lng: -2
    }
  },
  methods: {
    renderMap() {
      const db = firebase.firestore()
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: {
          lat: this.lat,
          lng: this.lng
        },
        zoom: 6,
        maxZoom: 15,
        minZoom: 3,
        streetViewControl: false
      });
      db.collection('users').get().then(users => {
        users.docs.forEach(doc => {
          let data = doc.data()
          if (data.geolocation) {
            let marker = new window.google.maps['Marker']({
              position: {
                lat: data.geolocation.lat,
                lng: data.geolocation.lng,
              },
              map: map
            })
            // add click event to marker
            marker.addListener('click', () => {
              this.$router.push({name: 'ViewProfile', params: {id: doc.id}})
            })
          }
        })
      })
    },
    checkGeoLocation(user) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          this.lat = pos.coords.latitude
          this.lng = pos.coords.longitude

          // find the user record and then update geoCoords
          this.updateGeoCoords(user, pos)

          this.renderMap()
        }, (e) => {
          console.error(e)
          this.renderMap()
        }, {maximumAge: 600000, timeout: 3000})
      } else {
        // position center by default values
        this.renderMap()
      }
    },
    updateGeoCoords(user, pos) {
      firebase.firestore().collection('users').where('user_id', '==', user.uid).get()
        .then(snapshot => {
          snapshot.forEach((doc) => {
            firebase.firestore().collection('users').doc(doc.id).update({
              geolocation: {
                lat: pos.coords.longitude,
                lng: pos.coords.longitude
              }
            })
          })
        }).then(() => {
        this.renderMap()
      })
    }
  },
  mounted() {
    // get current user
    let user = firebase.auth().currentUser
    // get user get geolocation
    this.checkGeoLocation(user)
  }
}
</script>

<style scoped>
.google-map {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
