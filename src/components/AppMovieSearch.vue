<template>
   <div>
        <input @input="searchFilter()" 
        v-model="searchInput" 
        type="text" 
        class="form-control" 
        placeholder="Search" 
        aria-label="Search"/>
   </div>
</template>

<script>
    export default {
        methods: {
            searchFilter() {
                this.$emit("searchResult", this.searchInput);
            }
        },
        data() {
            return {
                searchInput: ""
            }
        }
    }
</script>
