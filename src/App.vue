<template>
  <nav v-if="showNavbar">
    <ul class="nav justify-content-center nav-fill flex-column flex-sm-row">
      <li class="nav-item">
        <router-link :to="{ name: 'Home' }" class="nav-link flex-sm-fill text-sm-center" >Home</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: 'CreateSubreddit' }" class="nav-link flex-sm-fill text-sm-center">Create a new subreddit</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: 'Subreddits' }" class="nav-link flex-sm-fill text-sm-center">Joined subreddits</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: 'Login' }"  class="nav-link flex-sm-fill text-sm-center">Logout</router-link>
      </li>      
    </ul>
  </nav>
  <router-view @showNavbar="showNavbarM" @hideNavbar="hideNavbar"/>
</template>

<script>
export default {
  data() {
    return {
      showNavbar: false
    }
  },
  methods: {
    showNavbarM(){
      this.showNavbar = true
    },
    hideNavbar(){
      this.showNavbar = false
    }
  }
}
</script>

<style lang="scss">
body{
  background-color: #ccc;
}
.container{
  margin-top: 30px;

  .btn{
    margin: 10px;
  }
}
.nav{
  background-color: #2c3e50;
  a {
    color: #42b983;
    
    &.router-link-exact-active {
      color: #2c3e50;
      background-color: #42b983;
    }
    &:hover{
      color: #24724f;
    }
  }
}

form{
  width: 75%;
  margin: auto;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
