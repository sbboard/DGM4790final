<template>
    <div>
        <div v-for="item in characters" :key="item.id" :id="item.id">
            <template v-if="item.thumbnailImg != null">
                <img :src="item.thumbnailImg" :alt="item.name"/>
            </template>
            <template v-else>
                <img src="https://www.my-vb.com/img/assets/missing_image.jpg" :alt="item.name"/>
            </template>
            <div class="crossBar">Name: {{item.name}}</div> 
            <div class="crossBar">Series: <span :id="item.name" class="seriesSpan">Undefined</span></div>            
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
