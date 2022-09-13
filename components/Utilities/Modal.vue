<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" :id="this.modalName">
      <div
        class="modal"
        role="dialog"
        :style="`max-width: ${width}px;`"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <slot name="header"></slot>
          <button
            type="button"
            class="btn-close"
            @click="close"
            aria-label="Close modal"
          >
            x
          </button>
        </header>

        <section class="modal-body" id="modalDescription">
          <slot name="body"></slot>
        </section>

        <!-- <footer class="modal-footer">
          <slot name="footer"></slot>
        </footer> -->
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    width: { type: Number, default: 500 },
    modalName: { type: String, default: 'modal' },
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>
