<template>
  <div class="container">
    <h1>Change your password</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>Original password:</label>
        <input type="password" required v-model="originalP" class="form-control">
        <div v-if="originalError" class="alert alert-danger">{{ originalError }}</div>
      </div>

      <div class="form-group">
          <label>New password:</label>
          <input type="password" required v-model="newP" class="form-control">
          <div v-if="newError" class="alert alert-danger">{{ newError }}</div>
      </div>
      <div class="form-group">
           <label>Confirm password:</label>
           <input type="password" required v-model="confirmP" class="form-control">
          <div v-if="confirmError" class="alert alert-danger">{{ confirmError }}</div>
      </div>

      <button class="btn btn-outline-dark">Change</button>
    </form>
    <div @click="redirectBack()" class="btn btn-outline-dark">
         Go back
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      currentUserID: 0,
      currentUserEmail: '',
      originalP: '',
      originalError: '',
      newP: '',
      newError: '',
      confirmP: '',
      confirmError: '',
      users: []
    }
  },
  methods: {
    redirectBack(){
      this.$router.go(-1)
    },
    handleSubmit() {
      this.newError = this.newP.length > 5 ?
          '' : 'Password should be at least 6 characters long!'
      if(!this.newError){
          this.newError = this.newP.length > 30 ?
              'Password should be maximum 30 characters long!' : ''
      }
      if(!this.newError){
        this.newError = this.newP === this.originalP ?
            'Original and new passwords should be diffrent!' : ''
      }
      this.confirmError = this.confirmP === this.newP ?
          '' : 'Password are diffrent!'
      fetch('http://localhost:3000/api/user')
          .then(res => res.json())
          .then(data => this.users = data)
          .then(() => {
            const user = this.users.find(item => item.email === this.currentUserEmail)
            this.originalError = this.originalP === user.password ?
                '' : 'Wrong password!'
          })
          .then(() => {
            if(!this.originalError && !this.newError && !this.confirmError){
              this.change()
            }
          })
          .catch(err => console.log(err))
    },
    change(){
      const data = {password: this.newP}
      fetch(`http://localhost:3000/api/user/${this.currentUserID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      .then(this.redirectBack())
      .catch((err) => console.log(err.message))
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