<template>
    <div class="container">
        <h3>{{ movie.title }}</h3>
        <div>{{ movie.director }}</div>
        <div>{{ movie.imageUrl }}</div>
        <div>{{ movie.releaseDate }}</div>
        <div>{{ movie.genre }}</div>
        <div>{{ movie.duration }}</div>
        <hr>
    </div>
</template>

<script>
import { moviesService } from '../services/MoviesService.js';

export default {
    props: {
        movie: {
            type: Object
        }
    }
}
</script>
