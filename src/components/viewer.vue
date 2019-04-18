<template>
    <div class="card-columns">
        <div class="card" v-for="item in characters" :key="item.id" :id="item.id">
            <template v-if="item.thumbnailImg != null">
                <img class="card-img-top" :src="item.thumbnailImg" :alt="item.name"/>
            </template>
            <template v-else>
                <img class="card-img-top" src="https://www.my-vb.com/img/assets/missing_image.jpg" :alt="item.name"/>
            </template>
            <h5 class="card-title">Name: {{item.name}}</h5> 
            <p class="card-text">Series: <span :id="item.name" class="seriesSpan">Undefined</span></p>            
        </div>
    </div>
</template>

<script>
import gql from 'graphql-tag'
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
                thumbnailImg
            }
        }`,
    },
    
}
</script>

<style lang="sass">

</style>
