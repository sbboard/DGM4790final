<template>
    <div>
        <h1>Character Manager</h1>
        <h2>Create Character</h2>
        <form @submit.prevent="createCharacter()">
            <label>New Character Name:</label>
            <input required name="newName"/>
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
        }
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
        }
    }
}
</script>

<style lang="sass">

</style>
