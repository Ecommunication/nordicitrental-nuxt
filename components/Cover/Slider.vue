<template>
    <div class="main-cover cover-slider">
        <div class="cover-slider__container">
            <div class="cover-slider__item" v-for="slide in slides" :key="slide.id" :style="'background-image: url(http://localhost:1337'+slide.BackgroundImage.url+')'">
                <section class="capture grid-small margin-center">
                    <div class="flex flex-column capture__text">
                        <span class="block" v-html="slide.TextAreaHeader"></span>
                        <span class="block" v-html="slide.TextAreaSubHeader"></span>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'jquery'

export default {
    props: ['slides'],
    mounted() {

        setTimeout(function () {
            var allBoxes = $(".cover-slider__container").children("div");
            transitionBox(null, allBoxes.first());

            function transitionBox(from, to) {
                function next() {
                    var nextTo;
                    if (to.is(":last-child")) {
                        nextTo = to.closest(".cover-slider__container").children("div").first();
                    } else {
                        nextTo = to.next();
                    }
                    to.fadeIn(500, function () {
                        setTimeout(function () {
                            transitionBox(to, nextTo);
                        }, 8000);
                    });
                }

                if (from) {
                    from.fadeOut(500, next);
                } else {
                    next();
                }
            }

        }, 100);
    },
    methods: {
        transitionBox: function () {

        }
    }
}
</script>
