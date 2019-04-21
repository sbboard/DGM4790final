<template>
    <div>
        <h1>Series Manager</h1>
        <h2>Create Series</h2>
        <form @submit.prevent="create()">
            <div class="form-group">
            <label>Series Name</label>
            <input class="form-control" name="name" required/>
            </div>
            <div class="form-group">
            <label>Debut Year</label>
            <input class="form-control" name="debutYear" type="number" required/>
            </div>
            <div class="form-group">
            <label>First Smash</label>
            <select class="form-control" name="firstSmash" required>
                <option value='1'>Super Smash Bros 64</option>
                <option value='2'>Super Smash Bros Melee</option>
                <option value='3'>Super Smash Bros Brawl</option>
                <option value='4'>Super Smash Bros 4</option>
                <option value='5'>Super Smash Bros Ultimate</option>
            </select>
            </div>
            <div class="form-group">
            <label>Nintendo Property?</label>
            <input type="radio" name="firstParty" value="true" checked="checked"> Yes<br/>
            <input type="radio" name="firstParty" value="false"> No<br/>
            </div>
            <input class="btn btn-primary" type="submit"/>
        </form>

        <h2>Assign Character to Series</h2>
        <form @submit.prevent="assign()">
            <div class="form-group">
            <label>Unassigned Character</label>
            <select class="form-control" name="assignSeries">
                <option v-for="item in unassignedCharacters" :key="item._id">{{item}}</option>
            </select>
            </div>
            <div class="form-group">
            <label>Assign to...</label>
            <select class="form-control" name="assignSeries">
                <option :value="item.name" v-for="item in listOfSeries" :key="item._id">{{item.name}}</option>
            </select>
            </div>
            <input class="btn btn-primary" type="submit"/>
        </form>

        <h2>Series Deletion Tool</h2>
        <form @submit.prevent="deleteTool()">
            <div class="form-group">
            <label>Series</label>
            <select class="form-control" name="deleteSeries">
                <option :value="item._id" v-for="item in listOfSeries" :key="item._id">{{item.name}}</option>
            </select>
            </div>
            <input class="btn btn-primary" type="submit"/>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import gql from 'graphql-tag'

export default {
    data(){
        return{
            listOfSeries: [],
            characters: [],
            listOfCharactersAssigned: [],
            unassignedCharacters: []
        }
    },
    mounted () {
        this.getSeries()
        this.getAssignedCharacters()
    },
    apollo: {
        // Simple query that will update the 'hello' vue property
        characters: gql`query getCharacterNames{characters{name}}`,
    },
    watch: {
        characters(){
            for(let i=0; i<this.characters.length;i++){
                if(this.listOfCharactersAssigned.indexOf(this.characters[i].name) < 0){
                    this.unassignedCharacters.push(this.characters[i].name)
                }
            }
        }
    },
    methods:{
        getSeries(){
            axios.get(`http://192.168.56.1:8666/api/list/series`).then(response => (this.listOfSeries = response.data))
        },
        getAssignedCharacters(){
            axios.get(`http://192.168.56.1:8666/api/list/characters`).then(response => (this.listOfCharactersAssigned = response.data))
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
                document.getElementsByName("name")[0].value = ""
                document.getElementsByName("debutYear")[0].value = ""
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
