<template>
    <div class="container">
        <app-movie-search @searchResult="searchFilter($event)"/>
        <ul v-for="movie in filteredMovies" :key="movie.id">
            <li>
                <app-movie-row :movie="movie"/>
            </li>
        </ul>   
    </div>
</template>

<script>
import { moviesService } from '../services/MoviesService.js';
import AppMovieRow from './AppMovieRow.vue';
import AppMovieSearch from './AppMovieSearch.vue';

export default {
    components: {
        AppMovieRow,
        AppMovieSearch
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
            }, 
            search: ""
        }
    },
    beforeRouteEnter (to, from, next) {
        moviesService.getAll()
        .then((response) => {
            next((vm) => {
            vm.movies = response.data
            })
        })
    }, 
    methods: {
        searchFilter(event) {
            this.search = event;
            this.filteredMovies;
        }
    }, 
    computed: {
        filteredMovies() {
            return this.movies.filter(movie => movie.title.match(this.search));
        }
    }
}
</script>
