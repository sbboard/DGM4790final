<template>
    <div>
        <h1>Character Manager</h1>
        <h2 class="my-4">Create Character</h2>
        <form @submit.prevent="createCharacter()">
            <div class="form-group">
            <label>New Character Name:</label>
            <input class="form-control" required name="newName"/>
            </div>
            <input class="btn btn-primary" type="submit"/>
        </form>
        <h2 class="my-4">Delete Character</h2>
        <form @submit.prevent="deleteCharacter()">
            <div class="form-group">
            <label>Character to Delete:</label>
            <select class="form-control" name="deleteChar">
                <option :value="item.name" :id="item.id" v-for="item in characters" :key="item.id">{{item.name}}</option>
            </select>
            </div>
            <input class="btn btn-primary" type="submit"/>
        </form>
        <h2 class="my-4">Change Character Name</h2>
        <form @submit.prevent="changeName()">
            <div class="form-group">
            <label>Old Character Name:</label>
            <select class="form-control" name="characterName">
                    <option :value="item.name" :id="item.id" v-for="item in characters" :key="item.id">{{item.name}}</option>
            </select>
            </div>
            <div class="form-group">
            <label>New Name:</label>
            <input class="form-control" name="newNewName"/>
            </div>
            <input class="btn btn-primary" type="submit"/>
        </form>
    </div>
</template>

<script>
import gql from 'graphql-tag'
//import axios from 'axios'

export default {
    data(){
        return{
            characters: []
        }
    },
    apollo: {
        // Simple query that will update the 'hello' vue property
        characters: gql`query getCharacterNames{
            characters{
                name
                id
            }
        }`,
    },
    methods: {
        createCharacter(){
            const newName= document.getElementsByName("newName")[0].value
            // Mutation
            this.$apollo.mutate({
                mutation: gql`mutation ($name: String!){
                    createCharacter(data:{
                        name: $name
                    })
                    {
                        name
                        id
                    }
                }`,
                variables: {
                    name: newName,
                },
            }).then((data) => {
                // eslint-disable-next-line
                console.log(data)
                document.getElementsByName("newName")[0].value = ""
            }).catch((error) => {
                // eslint-disable-next-line
                console.error(error)
            })
        },
        deleteCharacter(){
            const deleteName= document.getElementsByName("deleteChar")[0].value
            // Mutation
            this.$apollo.mutate({
                mutation: gql`mutation ($name: String!){
                    deleteCharacter(where:{
                        name:$name
                    }){
                        name
                        id
                    }
                }`,
                variables: {
                    name: deleteName,
                },
            }).then((data) => {
                // eslint-disable-next-line
                console.log(data.data.deleteCharacter.id)
                //console.log(document.getElementById(data.id))
                document.getElementById(data.data.deleteCharacter.id).remove()
            }).catch((error) => {
                // eslint-disable-next-line
                console.error(error)
            })
        },
        changeName(){
            const oldName= document.getElementsByName("characterName")[0].value
            const newName= document.getElementsByName("newNewName")[0].value
            // Mutation
            this.$apollo.mutate({
                mutation: gql`mutation ($newName: String!, $oldName: String!){
                updateCharacter(data:{
                    name:$newName
                }
                where:{
                    name:$oldName
                }){
                    name
                    id
                }
                }`,
                variables: {
                    newName: newName,
                    oldName: oldName
                },
            }).then((data) => {
                // eslint-disable-next-line
                console.error(data)
                //document.getElementById(data.data.deleteCharacter.id).innerHTML = newName
                document.getElementsByName("newNewName")[0].value = ""
            }).catch((error) => {
                // eslint-disable-next-line
                console.error(error)
            })
        },
    }
}
</script>

<style lang="sass">

</style>
