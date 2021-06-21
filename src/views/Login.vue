<template>
    <div class="container">
        <h1>Sign in!</h1>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label>Email:</label>
                <input type="email" required v-model="email" class="form-control">
                <div v-if="emailError" class="alert alert-danger">{{ emailError }}</div>
            </div>

            <div class="form-group">
                <label>Password:</label>
                <input type="password" required v-model="password" class="form-control">
                <div v-if="passwordError" class="alert alert-danger">{{ passwordError }}</div>
            </div>

            <button class="btn btn-outline-dark">Login</button>
        </form>
        <div @click="redirectToRegister()" class="btn btn-outline-dark">
            Go to registration page
        </div>
    </div>
    
</template>

<script>
export default {
    data(){
        return{
            email: '',
            password: '',
            emailError: '',
            passwordError: '',
            users: [],
            user: null
        }
    },
    methods: {
        handleSubmit(){
            fetch('http://localhost:3000/api/user')
                .then(res => res.json())
                .then(data => this.users = data)
                .then(() => {
                    this.user = this.users.find(item => item.email === this.email)
                    this.emailError = this.user ?
                        '' : 'User with given email does not exist!'
                    if(!this.emailError){
                        this.passwordError = this.user.password === this.password ?
                            '' : 'Wrong password!'
                    }
                    if(!this.passwordError && !this.emailError){
                        this.login()
                    }
                })
                .catch(err => console.log(err.message))
        },
        redirectToRegister(){
            this.$router.push({ name: 'Register' })
        },
        login(){
            localStorage.userID = this.user.id
            localStorage.userEmail = this.user.email
            this.$router.push({ name: 'Home' })
            this.$emit('showNavbar')
        }
    },
    mounted() {
        localStorage.userID = 0
        localStorage.userEmail = ''
        this.$emit('hideNavbar')
    }
}
</script>

