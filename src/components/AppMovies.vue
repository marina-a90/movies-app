<template>
    <div class="container">
        <app-movie-search @searchResult="searchFilter($event)"/>
        <h5>There are currently {{ selectedMovies }} selected movies.</h5>
        <hr>
        <div v-if="filteredMovies.length">
            <ul v-for="movie in filteredMovies" :key="movie.id">
                <li v-if="movie.selected===true">
                    <app-movie-row 
                    @handleMovieSelect="selectMovie($event)" 
                    :movie="movie"
                    :style="{ backgroundColor: '#3CB371' }"
                    />
                </li>
                <li v-else>
                    <app-movie-row 
                    @handleMovieSelect="selectMovie($event)" 
                    :movie="movie"
                    />
                </li>
            </ul>
        </div>   
        <div v-else>There are no movies that match your search. :(</div>
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
                duration: "", 
                selected: false
            }, 
            search: "", 
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
        }, 
        selectMovie(event) {
            this.movie.Filtered = this.movies.filter(movie => movie.id === event);
            this.movie = this.movie.Filtered[0];
            this.movie.selected = true;
        }
    }, 
    computed: {
        filteredMovies() {
            if (!this.movies.filter(movie => movie.title.match(this.search))) {
                return;
            }
            return this.movies.filter(movie => movie.title.match(this.search));
        }, 
        selectedMovies() {
            return this.movies.filter(movie => movie.selected === true).length;
        }
    }
}
</script>
