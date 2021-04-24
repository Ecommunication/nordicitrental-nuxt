<template>
    <p class="grid-small margin-center" v-if="$fetchState.pending">Indlæser side</p>
    <p class="grid-small margin-center" v-else-if="$fetchState.error">Vi kunne desværre ikke indlæse siden i øjeblikket.
        Prøv igen senere.</p>
    <div class="index" v-else>
        <CoverSlider :slides="indexData.IndexPageSlider"/>
        <div class="grid-wide mg-auto mt-16" v-if="indexData.IndexCategories">
            <div class="text-center mb-20">
                <h3 class="text-blue title-md">Vælg et produkt du ønsker at leje:</h3>
            </div>

            <div class="wrap-grid wrap-5 index-categories mt-3 mb-3">
                <nuxt-link to="/"
                           class="flex flex-column flex-justify-center flex-align-center border-radius-medium border-all pr-6 pl-6"
                           v-for="(cat, index) in indexData.IndexCategories" :key="index">
                    <span v-if="cat.Image.url"><img class="mx-auto" :src="cat.Image.url | imageUrl"></span>
                    <span class="text-md weight-thin">{{cat.Title}}</span>
                </nuxt-link>
            </div>
            <div class="grid flex flex-justify-center">
                <nuxt-link to="/" class="btn btn-blue text-center mx-auto mt-10">
                    Alle produkter
                </nuxt-link>
            </div>
        </div>

        <div class="grid-full bg-gray-light mt-20 pb-20">
            <div class="flex flex-wrap flex-justify-center pt-10 pb-10">
                <h3 class="text-blue title-md weight-thin">Vi har gjort det nemt at leje IT udstyr</h3>
            </div>
            <div class="grid-wide wrap-grid wrap-4 mt-3">
                <div v-for="(item, index) in indexData.IndexRentalBennefits" :key="index"
                     class="flex flex-justify-center flex-column text-center pl-6 pr-6">
                    <div class="h-80">
                        <span v-if="item.Icon.url"><img class="mx-auto" :src="item.Icon.url | imageUrl"></span>
                    </div>
                    <div>
                        <span class="block mt-1 mb-1 text-md text-blue weight-bold">{{item.Title}}</span>
                        <span class="block text-small">{{item.Description}}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="index-letter-box wrap-grid grid-cols-2">
            <div class="grid grid-rows-2 outline">
                <div class="outline outline-image-box"
                     :style="'background-image: url(http://localhost:1337'+ indexData.IndexLetterboxImageLeft.url +')'"/>
                <div class="outline pl-10 pr-10 pt-32 pb-10 bg-blue" v-html="indexData.IndexLetterboxTextLeft"/>
            </div>
            <div class="outline pl-32 pr-32 pt-20 pb-10 bg-gray-dark" v-html="indexData.IndexLetterboxTextRight"/>
        </div>

        <div class="grid-wide">
            <div class="pt-10 pb-10" v-html="indexData.IndexServiceDescription"></div>
        </div>

        <div class="grid-wide wrap-grid wrap-4">
            <div class="text-center" v-for="(item, index) in indexData.IndexCategoriesCount" :key="index">
                <span class="block">{{item.Title}}</span>
                <span><img :src="'http://localhost:1337' + item.Icon.url"/></span>
                <h3 class="countable">{{item.Counter}}</h3>
            </div>
        </div>

        <div class="bg-blue pt-20 pb-20">
            <div class="grid-wide">
                <div class="wrap-grid wrap-4">
                    <div class="text-center flex flex-justify-center flex-align-center" v-for="(item, index) in indexData.IndexReferencesCarousel">
                        <span><img :src="'http://localhost:1337' + item.Reference[0].url" alt=""></span>
                    </div>
                </div>
            </div>
        </div>

        <div class="index-contact-box wrap-grid wrap-2">
            <div class="index-contact-box__image" :style="'background-image: url(http://localhost:1337'+ indexData.IndexContactLeftImage.url +')'"></div>
            <div>
                <div class="text-center pt-20 pb-20" v-html="indexData.IndexContactRightText"></div>
                <div class="grid-small">
                    <div class="wrap-grid wrap-2">
                        <div>
                            <span>Kontakt</span>
                            <div v-html="indexData.IndexContactRightInfo" />
                        </div>
                        <div>
                            <span>Bliv ringet op</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                indexData: [],
            }
        },
        async fetch() {
            try {
                const response = await fetch(process.env.apiUrl + '/forside');
                this.indexData = await response.json()
            } catch (e) {
                console.log(e)
            }
        }
    }
</script>
