<template>
    <div>Series Manager
        <h2>Create Series</h2>
        <label>Series Name</label>
        <input/>
        <label>Debut Year</label>
        <input/>
        <label>First Smash</label>
        <select>
            <option value='1'>Super Smash Bros 64</option>
            <option value='2'>Super Smash Bros Melee</option>
            <option value='3'>Super Smash Bros Brawl</option>
            <option value='4'>Super Smash Bros 4</option>
            <option value='5'>Super Smash Bros Ultimate</option>
        </select>
        <label>Nintendo Property?</label>
        <input type="radio" name="firstParty" value="true"> Yes<br>
        <input type="radio" name="firstParty" value="false"> No<br>

        <h2>Assign Character to Series</h2>

        <h2>Series Deletion Tool</h2>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
            listOfSeries: []
        }
    },
    mounted () {
        axios.get(`http://192.168.56.1:8666/api/list/series`).then(response => (this.listOfSeries = response.data))
    },
}
</script>

<style lang="sass">

</style>
