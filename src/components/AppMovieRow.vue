<template>
    <div class="container">
            <h3>{{ movie.title }}</h3>
            <div>{{ movie.director }}</div>
            <div>{{ movie.imageUrl }}</div>
            <div>{{ movie.releaseDate }}</div>
            <div>{{ movie.genre }}</div>
            <div>{{ movie.duration }}</div>
            <button v-if="movie.selected !== true" :disabled="isDisableBtn" @click.prevent="selectMovie">Select</button>        
        <hr>
    </div>
</template>

<script>
    export default {
        props: {
            movie: {
                type: Object
            }
        }, 
        data() {
            return {
                isDisableBtn: false
            }
        },
        methods: {
            selectMovie() {
                this.$emit("handleMovieSelect", this.movie.id);
            }
        }
    }
</script>
