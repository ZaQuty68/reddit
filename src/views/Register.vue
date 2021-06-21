<template>
    <div class="container">
        <h1>Sign up!</h1>
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
            <div class="form-group">
                <label>Confirm password:</label>
                <input type="password" required v-model="confirmPassword" class="form-control">
                <div v-if="confirmError" class="alert alert-danger">{{ confirmError }}</div>
            </div>
            
            <button class="btn btn-outline-dark">Sign up</button>
        </form>
        <div @click="redirectToLogin()" class="btn btn-outline-dark">
            Go to login page
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            email: '',
            password: '',
            confirmPassword: '',
            confirmError: '',
            passwordError: '',
            emailError: '',
            users: []
        }
    },
    methods: {
        handleSubmit(){
            this.passwordError = this.password.length > 5 ?
                '' : 'Password should be at least 6 characters long!'
            if(!this.passwordError){
                this.passwordError = this.password.length > 30 ?
                    'Password should be maximum 30 characters long!' : ''
            }
            this.confirmError = this.password === this.confirmPassword ?
                '' : 'Passwords are diffrent!'
            this.emailError = this.email.length > 255 ?
                'Email should be maximum 255 characters long!' : ''
            fetch('http://localhost:3000/api/user')
                .then(res => res.json())
                .then(data => this.users = data)
                .then(() => {
                    this.emailError = this.users.find(item => item.email === this.email) ?
                        'This email is already taken!' : ''
                })
                .then(() => {
                    if(!this.passwordError && !this.emailError && !this.confirmError){
                        this.register()
                    }
                })
                .catch(err => console.log(err.message))
            
        },
        register(){
            const data = { email: this.email, password: this.password}
            fetch('http://localhost:3000/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(this.redirectToLogin())
            .catch((err) => console.log(err.message))
        },
        redirectToLogin(){
            this.$router.push({ name: 'Login' })
        }
    },
    mounted() {
        localStorage.userID = 0
        localStorage.userEmail = ''
        this.$emit('hideNavbar')
    }
}
</script>