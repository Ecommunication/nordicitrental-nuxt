<template>
    <p class="grid-small margin-center" v-if="$fetchState.pending">Indlæser side</p>
    <p  class="grid-small margin-center" v-else-if="$fetchState.error">Vi kunne desværre ikke indlæse siden i øjeblikket. Prøv igen senere.</p>
    <div v-else>
        <CoverImage :textCover="product.data.TextCover" :imageCover="product.imageCover" />
    </div>
</template>
<script>
    export default {
        data() {
            return {
                product: {
                    imageCover: null,
                    data: null
                },
            }
        },
        async fetch() {
            const fetchProduct = await fetch(
                process.env.apiUrl + '/products?ProductSlug=iPad-air'
            ).then(res => res.json());

            const product = fetchProduct[0];

            this.product.data = product;
            this.product.imageCover = process.env.apiUrl + product.ImageCover.url;
        }
    }
</script>
