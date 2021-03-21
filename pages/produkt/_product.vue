<template>
    <p class="grid-small margin-center" v-if="$fetchState.pending">Indlæser side</p>
    <p class="grid-small margin-center" v-else-if="$fetchState.error">Vi kunne desværre ikke indlæse siden i øjeblikket.
        Prøv igen senere.</p>
    <div v-else>
        <CoverImage :textCover="product.data.TextCover" :imageCover="product.imageCover"/>

        <div class="product grid-small margin-center">
            <div class="product-gallery">
                <div class="product-gallery__main-image">
                    <img class="img-responsive" :src="product.gallery.main" alt="">
                </div>
            </div>
            <div class="product-meta">
                <div class="product-meta__specs"></div>
                <div class="product-meta__prices">
                    <div class="product-meta__prices-weekly">
                        <span>
                            {{ product.data.DailyPrice }}
                            <i class="product-meta__prices-price-info">Pris for første uges leje</i>
                        </span>
                    </div>
                    <div class="product-meta__prices-daily">
                        <span>
                            {{ product.data.DailyPriceAfterWeek }}
                            <i class="product-meta__prices-price-info">Pris efter første uges leje, pr. dag.</i>
                        </span>
                    </div>
                </div>
                <div class="product-meta__description">
                    <div v-html="product.data.DescriptionShort"></div>
                </div>
                <div class="product-meta__buy-section">
                    <div class="product-meta__buy-section__addons"></div>
                    <div class="product-meta__buy-section__period"></div>
                    <div class="product-meta__buy-section__prices"></div>
                    <div class="product-meta__buy-section__cart-section"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                product: {
                    imageCover: null,
                    textCover: null,
                    metaTitle: null,
                    metaDescription: null,
                    gallery: {
                        main: null,
                        thumbnails: null
                    },
                    data: null
                },
            }
        },
        head() {
            return {
                title: this.product.textCover,
                meta: [
                    {
                        name: 'title',
                        content: this.product.metaTitle ?? ''
                    },
                    {
                        name: 'description',
                        content: this.product.metaDescription ?? ''
                    }
                ]
            }
        },
        async fetch() {
            let product = await fetch(
                process.env.apiUrl + '/products?ProductSlug=' + this.$route.params.product
            ).then(res => res.json());

            product = product[0];

            console.log(product)

            this.product.data = product;
            this.product.imageCover = process.env.apiUrl + product.ImageCover.url;

            this.product.metaTitle = product.MetaTitle;
            this.product.textCover = product.TextCover;
            this.product.metaDescription = product.MetaDescription;

            this.product.gallery.main = process.env.apiUrl + product.MainImage.url
        }
    }
</script>
