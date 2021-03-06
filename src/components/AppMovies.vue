<template>
    <div class="container">

        <app-movie-search @searchResult="searchFilter($event)"/>
        <!-- <h5>You have selected {{ selectedMovies | allMoviesSelected }} movies ({{ selectedMovies }}).</h5> -->
        <h5 v-if="selectedMovies === this.movies.length">You have selected all the movies ({{ selectedMovies }}).</h5>
        <h5 v-else>You have selected {{ selectedMovies }} movies.</h5>
        <hr>

        <button @click.prevent="selectAllMovies">Select all</button>
        <button @click.prevent="deselectAllMovies">Deselect all</button>
        <hr>

        <button @click.prevent="sortMoviesByName">Sort by name (ascending)</button>
        <button @click.prevent="sortMoviesByNameDesc">Sort by name (descending)</button>
        <button @click.prevent="sortMoviesByDuration">Sort by duration (ascending)</button>
        <button @click.prevent="sortMoviesByDurationDesc">Sort by duration (descending)</button>
        <hr>

        <div v-if="search!=''">
            <h3>Search results - filtered from all movies</h3>
            <div v-if="filteredMovies.length">
                <ul v-for="movie in filteredMovies" :key="movie.id" :style="{ backgroundColor: 'darkgreen' }">
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
        <hr>

        <h3>Movies on page {{ currentPage }}</h3>
        <ul v-for="movie in visibleMovies" :key="movie.id"
            v-bind:visibleMovies="visibleMovies"
            v-bind:currentPage="currentPage">
            <li>
                <app-movie-row 
                :movie="movie"
                :style="{ backgroundColor: '#3CB371' }"
                />
            </li>
        </ul>

        <pagination
            v-bind:movies="movies"
            v-on:page:update="updatePage"
            v-bind:currentPage="currentPage"
            v-bind:pageSize="pageSize"
        />

    </div>
</template>

<script>
import { moviesService } from '../services/MoviesService.js';
import AppMovieRow from './AppMovieRow.vue';
import AppMovieSearch from './AppMovieSearch.vue';
import pagination from './Pagination.vue'

export default {
    components: {
        AppMovieRow,
        AppMovieSearch, 
        pagination
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
            
            currentPage: 0, 
            pageSize: 5, 
            visibleMovies: []
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
    beforeMount() {
        this.updateVisibleMovies();
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
        }, 
        selectAllMovies() {
            this.movies.map(movie => movie.selected = true);
        }, 
        deselectAllMovies() {
            this.movies.map(movie => movie.selected = false);
        }, 
        sortMoviesByName() {
            this.movies.sort((a, b) => (a.title > b.title) ? 1 : -1);
        },
        sortMoviesByNameDesc() {
            this.movies.sort((a, b) => (a.title < b.title) ? 1 : -1);
        },
        sortMoviesByDuration() {
            this.movies.sort((a, b) => (a.duration - b.duration >= 0) ? 1 : -1);
        },
        sortMoviesByDurationDesc() {
            this.movies.sort((a, b) => (a.duration - b.duration < 0) ? 1 : -1);
        }, 

        updatePage(pageNumber) {
            this.currentPage = pageNumber;
            this.updateVisibleMovies();
        },
        updateVisibleMovies() {
            this.visibleMovies = this.movies.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize);
            if (this.visibleMovies.length == 0 && this.currentPage > 0) {
                this.updatePage(this.currentPage -1);
            }
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
    }, 
    // filters: {
    //     allMoviesSelected(values) {
    //         return (value==this.movies.length) ? "all the" : value;
    //     }
    // }
}
</script>
