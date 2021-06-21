<template>
    <div class="container">
        <h1>Create a new subreddit!</h1>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label>Name:</label>
                <input type="text" required v-model="name" class="form-control">
                <div v-if="nameError" class="alert alert-danger">{{ nameError }}</div>
            </div>

            <div class="form-group">
                <label>Description:</label>
                <input type="text" required v-model="description" class="form-control">
                <div v-if="descriptionError" class="alert alert-danger">{{ descriptionError }}</div>
            </div>
            
            <button class="btn btn-outline-dark">Create</button>
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
            name: '',
            nameError: '',
            description: '',
            descriptionError: '',
            subreddits: [],
            subredditID: 0
        }
    },
    methods: {
        redirectBack(){
            this.$router.go(-1)
        },
        handleSubmit(){
            this.nameError = this.name.length > 30 ?
                'Name should be maximum 30 characters long!' : ''
            this.descriptionError = this.description.length > 255 ?
                'Descrioption should be maximum 255 charaters long!' : ''
            fetch('http://localhost:3000/api/subreddit')
                .then(res => res.json())
                .then(data => this.subreddits = data)
                .then(() => {
                    this.nameError = this.subreddits.find(item => item.name === this.name) ?
                        'This name is already taken!' : ''
                })
                .then(() => {
                    if(!this.nameError && !this.descriptionError){
                        this.add()
                    }
                })
                .catch(err => console.log(err.message))
            
        },
        add(){
            const data = {name: this.name, description: this.description, user_id: this.currentUserID}
            fetch('http://localhost:3000/api/subreddit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(this.getId())
            .catch((err) => console.log(err.message))
        },
        getId(){
            fetch('http://localhost:3000/api/subreddit')
                .then(res => res.json())
                .then(data => this.subreddits = data)
                .then(() => {
                    this.subredditID = this.subreddits.find(item => item.name === this.name).id
                })
                .then(() => {
                    this.joinSubreddit()
                    })
                .catch((err) => console.log(err.message))
        },
        joinSubreddit(){
            const data = { user_id: this.currentUserID, subreddit_id: this.subredditID}
            fetch('http://localhost:3000/api/subredditUser', {
                method: 'POST',
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