<template>
    <div class="container">
        <div v-if="subreddit">
            <div class="row">
                <div class="col">
                    <h3 class="btn btn-dark" >{{ subreddit.name }}</h3>
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
            <div class="row alert alert-secondary" v-if="posts">
                <div class="row alert alert-dark" v-for="post in posts" :key="post.id">
                    <div class="col">
                        {{ post.content }}
                    </div>
                    <div class="row">
                        <div class="col btn btn-outline-dark">
                            upvote
                        </div>
                        <div class="col btn btn-outline-dark">
                            downvote
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {{ allVotes }}
    </div>    
</template>

<script>
export default {
    data(){
        return{
            currentUserID: 0,
            currentUserEmail: '',
            subreddits: [],
            subreddit: null,
            posts: [],
            allVotes: [],
            votes: [],
            name: this.$route.params.name
        }
    },
    methods: {
        getPosts(){
            fetch('http://localhost:3000/api/post')
                .then(res => res.json())
                .then(data => this.posts = data)
                .then(() => {
                    this.posts = this.posts.filter((item) => item.subreddit_id === this.subreddit.id)
                    this.getVotes()
                })
                .catch((err) => console.log(err.message))
        },
        getVotes(){
            fetch('http://localhost:3000/api/postVote')
                .then(res => res.json())
                .then(data => this.allVotes = data)
                .then(() => {
                    this.allVotes.filter((item) => this.posts.find((item2) => item2.id === item.post_id))
                })
                .then(() => {
                    console.log(this.allVotes)
                })
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
        fetch('http://localhost:3000/api/subreddit')
            .then(res => res.json())
            .then(data => this.subreddits = data)
            .then(() => {
                this.subreddit = this.subreddits.find((item) => item.name === this.name)
                this.getPosts()
            })
            .catch((err) => console.log(err.message))
    }
}
</script>