<template>
  <div>
    <h2 v-if="title" class="text-center">{{ title }}</h2>
    <div class="form-row">
      <div class="left-col">
        <slot name="left-col"></slot>
      </div>
      <div class="right-col">
        <div class="form text-center">
          <h3 v-if="formTitle" class="text-blue mb-10">{{ formTitle }}</h3>

          <form class="mt-5">
            <div class="input-container">
              <div class="label">Navn:</div>
              <input
                type="text"
                name="your-name"
                value=""
                aria-required="true"
                aria-invalid="false"
              />
            </div>

            <div class="input-container">
              <div class="label">Email:</div>
              <input
                type="email"
                name="your-email"
                value=""
                aria-required="true"
                aria-invalid="false"
              />
            </div>

            <div class="input-container">
              <div class="label">Virksomhed:</div>
              <input
                type="text"
                name="your-subject"
                value=""
                aria-invalid="false"
              />
            </div>

            <div class="input-container">
              <div class="label">Telefon:</div>
              <input
                type="text"
                name="your-subject"
                value=""
                aria-invalid="false"
              />
            </div>

            <div class="input-container">
              <div class="label">Besked:</div>
              <textarea
                name="your-message"
                cols="40"
                rows="10"
                aria-invalid="false"
              ></textarea>
            </div>

            <div class="input-container">
              <div class="button btn-primary" style="float: none; width: 100%">
                Send
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: false },
    formTitle: { type: String, required: false }
  }
};
</script>

<style lang="scss" scoped>
.form-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .left-col {
    margin: 0 75px 30px 75px;
  }

  .right-col {
  }
}
</style>
