<template>
    <div>
        <h1>Series Manager</h1>
        <h2>Create Series</h2>
        <form @submit.prevent="create()">
            <label>Series Name</label>
            <input name="name" required/>
            <label>Debut Year</label>
            <input name="debutYear" type="number" required/>
            <label>First Smash</label>
            <select name="firstSmash" required>
                <option value='1'>Super Smash Bros 64</option>
                <option value='2'>Super Smash Bros Melee</option>
                <option value='3'>Super Smash Bros Brawl</option>
                <option value='4'>Super Smash Bros 4</option>
                <option value='5'>Super Smash Bros Ultimate</option>
            </select>
            <label>Nintendo Property?</label>
            <input type="radio" name="firstParty" value="true" checked="checked"> Yes<br/>
            <input type="radio" name="firstParty" value="false"> No<br/>
            <input type="submit"/>
        </form>

        <h2>Assign Character to Series</h2>
        <form @submit.prevent="assign()">
            <label>Unassigned Character</label>
            <select name="assignCharacterNoSeries">
                <option value='jimboy'>JimBoy</option>
            </select>
            
            <label>Assign to...</label>
            <select name="assignSeries">
                <option :value="item.name" v-for="item in listOfSeries" :key="item._id">{{item.name}}</option>
            </select>
            <input type="submit"/>
        </form>

        <h2>Series Deletion Tool</h2>
        <form @submit.prevent="deleteTool()">
            <label>Series</label>
            <select name="deleteSeries">
                <option :value="item._id" v-for="item in listOfSeries" :key="item._id">{{item.name}}</option>
            </select>
            <input type="submit"/>
        </form>
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
        this.getSeries()
    },
    methods:{
        getSeries(){
            axios.get(`http://192.168.56.1:8666/api/list/series`).then(response => (this.listOfSeries = response.data))
        },
        create(){
            const name= document.getElementsByName("name")[0].value
            const firstParty= document.getElementsByName("firstParty")[0].value
            const debutYear= document.getElementsByName("debutYear")[0].value
            const firstSmash= document.getElementsByName("firstSmash")[0].value
            axios
            .post('http://192.168.56.1:8666/api/create',{
                name: name,
                firstParty: firstParty,
                debutYear: debutYear,
                firstSmash: firstSmash
            })
            .then(response => {
                // eslint-disable-next-line
                console.log(response.data)
                this.getSeries()
            })
            .catch(error => {
                // eslint-disable-next-line
                console.log(error.message);
            })
        },
        assign(){
            const name= document.getElementsByName("assignSeries")[0].value
            const character= document.getElementsByName("assignCharacterNoSeries")[0].value
            axios
            .put('http://192.168.56.1:8666/api/assign',{
                name: name,
                character: character
            })
            .then(response => {
                // eslint-disable-next-line
                console.log(response.data)
            })
            .catch(error => {
                // eslint-disable-next-line
                console.log(error.message);
                this.getSeries()
            })
        },
        deleteTool(){
            const id= document.getElementsByName("deleteSeries")[0].value
            axios.delete(`http://192.168.56.1:8666/api/${id}/delete`)
            .then(response => {
                // eslint-disable-next-line
                console.log(response.data)
                this.getSeries()
            })
        },
    }
}
</script>

<style lang="sass">

</style>
