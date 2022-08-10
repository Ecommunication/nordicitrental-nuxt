<template>
  <div>
    <headerImg
      :img="headerCover"
      :text="headerTitle"
    />
    <div class="grid-small p-10">
      <p>Vi har nu modtaget din  henvendelse, og vil besvare hurtigst muligt - inden for 24 timer.</p>
    </div>
  </div>
</template>
<script>
import headerImg from "~/components/Utilities/HeaderImg";
export default {
  components: {
    headerImg
  },
  data () {
    return {
      headerTitle: "Tak for din henvendelse",
      headerCover: "https://nordic.nordicitrental.dk/uploads/contact_13ef9c8beb.jpeg"
    }
  }
}
</script>
