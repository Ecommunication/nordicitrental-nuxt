<template>
  <div class="product-gallery">
    <div class="product-gallery__main-image">
      <img v-if="gallery.main.url" :src="mainImage" :alt="gallery.main.alternativeText"/>
    </div>
    <div style="position: relative; margin-top: 50px;">
      <span class="product-gallery__arrows product-gallery__arrow product-gallery__arrows-left" v-bind:class="{disabled: this.thumbnailsIndex === 0}">
          <i @click="moveThumbnails('left')" class="fas fa-chevron-circle-left"></i>
      </span>
      <div class="product-gallery__thumbs" v-if="gallery.thumbnails.length > 1">
        <div class="product-gallery__thumbs-scroller" v-bind:style="scrollerTranslate">
          <div class="product-gallery__thumbs-scroller__thumb" v-for="(image, index) in gallery.thumbnails" :key="index">
            <span><img :src="image" @click="openModal(index)" /></span>
          </div>
        </div>
      </div>
      <span class="product-gallery__arrows product-gallery__arrow product-gallery__arrows-right" v-bind:class="{disabled: this.thumbnailsIndex === this.maxThumbnails -3}">
          <i @click="moveThumbnails('right')" class="fas fa-chevron-circle-right"></i>
      </span>
    </div>
    <div class="product-gallery__modal" v-bind:class="{active: this.showGalleryModal}">
      <div class="product-gallery__modal-inner">
        <span class="product-gallery__modal-inner__arrows product-gallery__modal-inner__arrow product-gallery__modal-inner__arrows-left" v-bind:class="{disabled: this.modalGalleryIndex === 0}">
          <i @click="moveModalGalleryImages('left')" class="fas fa-chevron-circle-left"></i>
        </span>
          <figure v-for="(image, index) in gallery.thumbnails">
            <img :src="image" v-show="modalGalleryIndex === index">
          </figure>
        <span class="product-gallery__modal-inner__arrows product-gallery__modal-inner__arrow product-gallery__modal-inner__arrows-right" v-bind:class="{disabled: this.modalGalleryIndex === this.maxThumbnails -1}">
          <i @click="moveModalGalleryImages('right')" class="fas fa-chevron-circle-right"></i>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['gallery'],
  data() {
    return {
      mainImage: this.gallery.main.url,
      thumbnailsIndex: 0,
      maxThumbnails: null,
      thumbsVisible: 3,
      scrollerCords: 0,
      gridScroll: 33.33,
      modalGallery: [],
      modalGalleryIndex: 0,
      showGalleryModal: false,
    }
  },
  created() {
    this.maxThumbnails = this.gallery.thumbnails.length;
    this.modalGallery = this.gallery.thumbnails;
  },
  computed: {
    scrollerTranslate: function () {
      return `transform: translate3d(${this.scrollerCords}%, 0, 0`;
    }
  },
  methods: {
    openModal(index) {
      this.modalGalleryIndex = index;
      this.showGalleryModal = true;
      console.log('test');
    },
    moveModalGalleryImages: function (pointer) {
      var newIndex = this.modalGalleryIndex;

      if (pointer === 'left') {
        newIndex--;
      } else {
        newIndex++;
      }

      if (newIndex < 0 || newIndex > this.maxThumbnails -1) {
        return;
      }

      this.modalGalleryIndex = newIndex;
    },
    moveThumbnails(pointer) {
      var newIndex = this.thumbnailsIndex;

      if (pointer === 'left') {
        newIndex--;
      } else {
        newIndex++;
      }

      if (newIndex < 0 || newIndex > this.maxThumbnails - this.thumbsVisible) {
        return;
      }

      this.thumbnailsIndex = newIndex;
      this.scrollerCords = -this.gridScroll * this.thumbnailsIndex;
    }
  }
}
</script>
