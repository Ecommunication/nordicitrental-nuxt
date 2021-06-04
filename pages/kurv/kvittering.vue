<template>
  <div class="container">
    <div class="kvittering">
      <div>
        kvittering .... Header Image ...
        <Breadcrumb class="mt-10 mb-10" />

        <div class="message">
          <p>Kære kunde.</p>
          <p>Tak for din bestilling</p>
          <p>
            Du vil modtage en lejeaftale/tilbud pr. e-mail inden for få timer.
            Lejeaftalen/tilbuddet skal accepteres ved at besvare e-mailen med et
            ”godkendt”. Aftalen er gældende, når vi har modtaget den accepterede
            lejeaftale/tilbud.
          </p>
          <p>
            Når vi har modtaget den godkendte lejeaftale/tilbud, vil du kort
            efter modtage en faktura til betaling. Betalingsbetingelserne
            fremgår af fakturaen. Betaling kan ske via kontooverførsel. Vilkår
            og betingelser er angivet i lejeaftale/tilbud samt på fakturaen.
          </p>
          <p>Med venlig hilsen</p>
          <div>pNordic IT Rental</div>
          <div>Industriparken 22A</div>
          <div>2750 Ballerup</div>
        </div>

        <div>
          <div class="mt-10">
            <h2>Order Details</h2>
            <ItemDetails :items="items" />
            <OrderDetails :details="orderDetails" />
          </div>

          <div class="mt-10">
            <h2>Kundeoplysninger</h2>
            <CustomerInformation :information="customerInformation" />
          </div>

          <div class="mt-10">
            <Addresses :addresses="addresses" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Breadcrumb from "@/components/Cart/Breadcrumb";
import ItemDetails from "@/components/Cart/Order/ItemDetails";
import OrderDetails from "@/components/Cart/Order/Details";
import CustomerInformation from "@/components/Cart/Order/CustomerInformation";
import Addresses from "@/components/Cart/Order/Addresses";

export default {
  components: {
    Breadcrumb,
    ItemDetails,
    OrderDetails,
    CustomerInformation,
    Addresses
  },
  data() {
    return {
      items: [
        {
          slug: "iPad-air",
          title: "iPad Air - WiFi only",
          productId: 1,
          amount: 5,
          total: 320,
          noOfDays: 8,
          startDate: "2021-05-27T21:00:00.000Z",
          endDate: "2021-06-03T21:00:00.000Z",
          itemId: 1622210291975
        },
        {
          slug: "i-pad-air-2-4",
          title: "Another iPad",
          productId: 2,
          amount: 1,
          total: 420,
          noOfDays: 12,
          startDate: "2021-06-01T21:00:00.000Z",
          endDate: "2021-06-13T21:00:00.000Z",
          itemId: 1622210291979
        }
      ],
      orderDetails: {
        subtotal: 320,
        shipping: 800,
        vat: 280,
        paymentMethod: "Bank Transfer",
        total: 1400,
        remark:
          "Caner from Proxify, just checking this is mock order, please do not take into consideration",
        cvr: "123"
      },
      customerInformation: {
        email: "[email protected]",
        telephone: "123456789"
      },
      addresses: {
        billing: "Nybrogade 2 1203 Copenhagen K",
        shipping: "Clematisvænget 22 Vesterborg Region Sjælland 4953 Denmark"
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.kvittering {
  padding-bottom: 80px;
}
.message {
  font-size: 0.8em;
  color: #092d4f;
}
</style>
