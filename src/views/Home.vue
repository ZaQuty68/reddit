<template>
  <div class="container">
    <h1>Welcome {{ currentUserEmail }} to miniREDDIT</h1>
    <div class="row">
      <div class="col">
        <router-link :to="{ name: 'Subreddits' }" class="btn btn-outline-dark">
            Manage subreddits
        </router-link>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <router-link :to="{ name: 'CreateSubreddit' }" class="btn btn-outline-dark">
            Create a new subreddit
        </router-link>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <router-link :to="{ name: 'ChangePassword' }" class="btn btn-outline-dark">
            Change password
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return{
      currentUserID: 0,
      currentUserEmail: ''
    }
  },
  mounted() {
    this.$emit('showNavbar')
    if(localStorage.userEmail) {
      this.currentUserID = parseInt(localStorage.userID)
      this.currentUserEmail = localStorage.userEmail
    }
    else{
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>
