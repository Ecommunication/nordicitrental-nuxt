<template>
  <div style="padding: 70px;">
    <h2 class="text-blue text-center">{{ title }}</h2>
    <div class="form-container">
      <div class="form-row">
        <div class="left-col">
          <div class="text-left employee">
            <h3 class="text-blue">Kontakt</h3>
            <p class="mt-10">
              <img
                src="https://nordicitrental.dk//wp-content/uploads/2017/12/employee_mic-135x135.png"
                alt="Kontakt"
              />
            </p>
            <p>
              Michael Vedel<br />
              Salg – kunder
            </p>
            <p class="mt-5">
              Tlf. 71998904<br />
              <a href="mailto:salg@nordicitrental.dk">salg@nordicitrental.dk</a>
            </p>
          </div>
        </div>
        <div class="right-col">
          <div class="form text-center">
            <h3 class="text-blue">Send os en besked, så kontakter vi dig i dag.</h3>

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
                <div
                  class="button btn-primary"
                  style="float: none; width: 100%"
                >Send</div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true }
  }
};
</script>

<style lang="scss" scoped>
.employee p {
  font-size: 16px;
}
.form-container {
  width: 600px;
  margin: auto;
  .form-row {
    display: flex;
    flex-wrap: wrap;
    justify-items: center;
    width: 100%;

    .left-col {
      width: 30%;
    }

    .right-col {
      width: 70%;
    }
  }
}

input, textarea {
  border-radius: 3px;
  border: 1px solid #e6e6e6;
  padding: 10px;
  width: 100%;
}
.input-container {
  margin-bottom: 8px;
  padding: 0 20px;
}
.label {
  font-size: 16px;
  font-family: "Open Sans";
}
</style>
