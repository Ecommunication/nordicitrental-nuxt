<template>
    <p class="grid-small margin-center" v-if="$fetchState.pending">Indlæser side</p>
    <p  class="grid-small margin-center" v-else-if="$fetchState.error">Vi kunne desværre ikke indlæse siden i øjeblikket. Prøv igen senere.</p>
    <div v-else>
        <CoverImage :textCover="category.cover.text" :imageCover="category.cover.image" />
        <div class="product-category grid-small margin-center">
            <div class="product" v-for="product in products" :key="product.id">
                <div class="product-image">
                    <div>
                        <img class="product-image__image-cover img-responsive" :src="'http://localhost:1337' + product.MainImage.url" alt="">
                    </div>
                </div>
                <div class="product-info">
                    <span class="product-info__title block">{{product.Name}}</span>
                    <div class="product-info__description"> {{ product.CategoryDescription}}</div>
                    <section class="product-info__details">
                        <div class="product-info__details-pricing">
                            <div class="product-info__details-pricing__weekly">
                                <span class="block">{{ product.DailyPrice }}</span>
                                <i class="product-info__details-pricing__price-info">Pris for første uges leje</i>
                            </div>
                            <div class="product-info__details-pricing__daily">
                                <span>{{ product.DailyPrice }}</span>
                                <i class="product-info__details-pricing__price-info">Pris efter første uges leje, pr. dag.</i>
                            </div>
                        </div>
                        <div class="product-info__details-buy">
                            <nuxt-link :to="'/produkt/' + product.ProductSlug" class="btn btn-shop btn-blue">Vælg produkt</nuxt-link>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                category: {
                    cover: {
                      text: null,
                      image: null,
                    },
                    description: null,
                    metaTitle: null,
                    metaDescription: null,
                },
                products: []
            }
        },
        head() {
            return {
                title: this.category.metaTitle,
                meta: [
                    {
                        name: 'title',
                        content: 'This is some title'
                    },
                    {
                        name: 'description',
                        content: this.category.metaDescription
                    }
                ]
            }
        },
        async fetch() {
            const fetchCategory = await fetch(
                process.env.apiUrl + '/product-categories?Slug=' + this.$route.params.category
            ).then(res => res.json());

            const category = fetchCategory[0];

            this.category.cover.text = category.TextCover;
            this.category.cover.image = process.env.apiUrl + category.ImageCover.url;
            this.category.metaTitle = category.MetaTitle;
            this.category.metaDescription = category.MetaDescription;
            this.products = category.products;
        }
    }
</script>
