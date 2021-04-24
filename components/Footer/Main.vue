<template>
    <footer class="bg-blue pt-20 pb-20">
        <div class="grid-small wrap-grid wrap-4" v-if="footer">
            <div v-html="footer.widget1" />
            <div v-html="footer.widget2" />
            <div v-html="footer.widget3" />
            <div>

            </div>
        </div>
        <div class="grid-small mt-10">
            <ul class="flex list-clean">
                <li class="pr-16" v-for="(item, index) in footer.images">
                    <span v-if="item.Image">
                        <img :src="'http://localhost:1337' + item.Image.url" alt="">
                    </span>
                </li>
            </ul>
        </div>
    </footer>
</template>
<script>
    export default {
        props: ['footer']
    }
</script>
