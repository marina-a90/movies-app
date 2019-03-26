<template>
    <div>
        <ul v-for="movie in movies" :key="movie.id">
            <li>
                <app-movie-row :movie="movie"/>
            </li>
        </ul>   
    </div>
</template>

<script>
import { moviesService } from '../services/MoviesService.js';
import AppMovieRow from './AppMovieRow.vue';

export default {
    components: {
        AppMovieRow
    },
    data() {
        return {
            movies: [], 
            movie: {
                title: "",
                director: "",
                imageUrl: "",
                releaseDate: "",
                genre: "",
                duration: ""
            }
        }
    },
    beforeRouteEnter (to, from, next) {
        // called before the route that renders this component is confirmed.
        // does NOT have access to `this` component instance,
        // because it has not been created yet when this guard is called!
        moviesService.getAll()
        .then((response) => {
            next((vm) => {
            vm.movies = response.data
            })
        })
    }
}
</script>
