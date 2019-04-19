<template>
    <div class="cardzz">
        <div v-for="item in characters" :key="item.id">
                <div class="card" :id="item.id">
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
        </div>
</template>

<script>
import axios from 'axios'
import gql from 'graphql-tag'
export default {
    data(){
        return{
            characters: [],
            cardCount: 3,
            seriesReturn: [],
        }
    },
    apollo: {
        characters: gql`query getCharacterNames{
            characters{
                name
                id
                thumbnailImg
            }
        }`,
    },
    watch:{
        characters(){
            axios.get(`http://192.168.56.1:8666/api/`).then(response => (this.seriesReturn = response.data))
            .then(this.theLoop)
        }
    },
    methods:{
        theLoop(){
            for(let i=0;i<this.seriesReturn.length;i++){
                const seriesName = this.seriesReturn[i].name
                const characterArray = this.seriesReturn[i].characters
                for(let i=0;i<characterArray.length;i++){
                    const characterName = characterArray[i]
                    document.getElementById(characterName).innerHTML = seriesName
                }
            }
        }
    }
}
</script>

<style lang="sass">
.cardzz
    display: flex
    flex-wrap: wrap
    justify-content: center
</style>
