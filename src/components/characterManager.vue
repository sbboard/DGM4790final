<template>
    <div>Series Manager
        <h2>Assign Character to Series</h2>
        name = input
        debut year = input
        first smash (dropdown all smash titles name=smash 64 value=1)
        nintendo property? radio button
        <select>
            <option :value="item.name" v-for="(item, id) in listOfSeries" :key="`${id}`">{{item.name}}</option>
        </select>

        <h2>Assign Character to Series</h2>
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
