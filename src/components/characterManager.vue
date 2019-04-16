<template>
    <div>
        <h1>Character Manager</h1>
        <h2>Create Character</h2>
        <form @submit.prevent="createCharacter()">
            <label>New Character Name:</label>
            <input required name="newName"/>
            <input type="submit"/>
        </form>
        <h2>Delete Character</h2>
        <form @submit.prevent="deleteCharacter()">
            <select name="deleteChar">
                <option :value="item.name" :id="item.id" v-for="item in characters" :key="item.id">{{item.name}}</option>
            </select>
            <input type="submit"/>
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
    }
}
</script>

<style lang="sass">

</style>
