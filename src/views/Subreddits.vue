<template>
    <div class="container">
        <h1>Owned subreddits</h1>
        <div v-if="ownedSubreddits">
            <div  v-for="subreddit in ownedSubreddits" :key="subreddit.id">
                <div class="row">
                    <div class="col">
                        <router-link :to="{name: 'R', params: { name: subreddit.name }}">
                            <h3 class="btn btn-dark">{{ subreddit.name }}</h3>
                        </router-link>
                    </div>
                </div>
                <div class="row">
                    <div class="col alert alert-secondary">
                        {{ subreddit.description }}
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="row">
                <div class="col">
                    You don't own any subreddits yet!
                </div>
            </div>
        </div>
        <h1>Joined subreddits</h1>
        <div v-if="joinedSubreddits">
            <div v-for="subreddit in joinedSubreddits" :key="subreddit.id">
                <div class="row">
                    <div class="col">
                        <router-link :to="{name: 'R', params: { name: subreddit.name }}">
                            <h3 class="btn btn-dark">{{ subreddit.name }}</h3>
                        </router-link>
                    </div>
                    <div class="col">
                        <span class="btn btn-outline-dark" :class="{ disabled : subreddit.user_id === currentUserID}" @click="leave(subreddit.id)">Leave</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col alert alert-secondary">
                        {{ subreddit.description }}
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="row">
                <div class="col">
                    You haven't joined any subreddits yet!
                </div>
            </div>
        </div>
        <h1>Rest of the subreddits</h1>
        <div v-if="subreddits">
            <div v-for="subreddit in subreddits" :key="subreddit.id">
                <div class="row">
                    <div class="col">
                        <router-link :to="{name: 'R', params: { name: subreddit.name }}">
                            <h3 class="btn btn-dark">{{ subreddit.name }}</h3>
                        </router-link>
                    </div>
                    <div class="col">
                        <span class="btn btn-outline-dark" @click="join(subreddit.id)">Join</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col alert alert-secondary">
                        {{ subreddit.description }}
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="row">
                <div class="col">
                    You have joined all the subreddits!
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            currentUserID: 0,
            currentUserEmail: '',
            subreddits: [],
            joinedSubreddits: [],
            ownedSubreddits: [],
            joinedSubredditsIDList: []
        }
    },
    methods: {
        getIDList(){
            fetch('http://localhost:3000/api/subredditUser')
                .then(res=> res.json())
                .then(data => this.joinedSubredditsIDList = data)
                .then(() => {
                    this.joinedSubredditsIDList = this.joinedSubredditsIDList.filter((item) => item.user_id === this.currentUserID)
                    this.joinedSubredditsIDList.forEach((item) => {
                        this.joinedSubreddits.push(this.subreddits.find(item2 => item2.id === item.subreddit_id))
                        this.subreddits = this.subreddits.filter((item2) => item2.id !== item.subreddit_id)
                    })
                })
        },
        leave(id){
            this.subreddits.push(this.joinedSubreddits.find((item) => item.id === id))
            this.joinedSubreddits = this.joinedSubreddits.filter((item) => item.id !== id)
            const connectionId = this.joinedSubredditsIDList.find((item) => item.subreddit_id === id).id
            this.joinedSubredditsIDList.filter((item) => item.subreddit_id !== id)
            fetch(`http://localhost:3000/api/subredditUser/${connectionId}`,{
                method: 'DELETE',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: null
            })
            .catch(err => console.log(err.message))
        },
        join(id){
            this.joinedSubreddits.push(this.subreddits.find((item) => item.id === id))
            this.subreddits = this.subreddits.filter((item) => item.id !== id)
            const data = { user_id: this.currentUserID, subreddit_id: id}
            fetch('http://localhost:3000/api/subredditUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(() => {
                fetch('http://localhost:3000/api/subredditUser')
                    .then(res => res.json())
                    .then(data => this.joinedSubredditsIDList = data)
                    .then(() => {
                        this.joinedSubredditsIDList = this.joinedSubredditsIDList.filter((item) => item.user_id === this.currentUserID)
                    })
            })
            .catch(err => console.log(err.message))
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
        fetch('http://localhost:3000/api/subreddit')
            .then(res => res.json())
            .then(data => this.subreddits = data)
            .then(() => {
                this.ownedSubreddits = this.subreddits.filter((item) => item.user_id === this.currentUserID)
            })
            .then(() => {
                this.getIDList()
            })
            .catch(err => console.log(err.message))
    }
}
</script>