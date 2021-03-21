<template>
    <div class="main-cover cover-slider">
        <div class="cover-slider__item" v-for="slide in frontPageSlider" :key="slide.id" :style="'background-image: url(http://localhost:1337'+slide.BackgroundImage.url+')'">

        </div>
    </div>
</template>
