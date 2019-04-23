<template>
    <div>
        <div class="controls">
            <div class="checkOptions" v-for="series in seriesReturn" :key="series._id">
                <input type="checkbox" :name="series.name" checked @click="toggle(series.name)"> {{series.name}} ({{series.characters.length}})
            </div>
            <div class="checkOptions">
                <input type="checkbox" checked @click="toggleUndefined()"> Unassigned
            </div>
        </div>
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
                        <p class="card-text">Series: <span :id="item.name" class="seriesSpan">Unassigned</span></p>            
                    </div>
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
            //loop through series
            for(let i=0;i<this.seriesReturn.length;i++){
                const seriesName = this.seriesReturn[i].name
                const characterArray = this.seriesReturn[i].characters
                //loop through characters
                for(let i=0;i<characterArray.length;i++){
                    const characterName = characterArray[i]
                    document.getElementById(characterName).innerHTML = seriesName
                    const spaceless = seriesName.replace(/\s/g, '')
                    document.getElementById(characterName).parentElement.parentElement.classList.add(spaceless);
                }
            }
        },
        toggle(series){
            const seriesMembers = document.getElementsByClassName(series.replace(/\s/g, ''))
            for(let i=0;i<seriesMembers.length;i++){
                if(seriesMembers[i].style.display == "none"){
                    seriesMembers[i].style.display = "inherit"
                }
                else{
                    seriesMembers[i].style.display = "none"
                }
            }
        },
        toggleUndefined(){
            const allCards = document.getElementsByClassName("card")
            for(let i=0;i<allCards.length;i++){
                const classString = allCards[i].attributes.class.value.split(" ")
                if(classString.length == 1){ 
                    if(allCards[i].style.display == "none"){
                        allCards[i].style.display = "inherit"
                    }
                    else{
                        allCards[i].style.display = "none"
                    }
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
.card
    img
        width: 255px
        height: 255px
</style>
