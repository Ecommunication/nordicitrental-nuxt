<template>
  <div class="container">
    <div class="row">
      <div class="col">
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

        <ClientOnly>
          <div class="py-10">
            <div>
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
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
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
  computed: {
    ...mapState(["orderReceipt"]),
    orderDetails() {
      return {
        subtotal: (this.orderReceipt?.order?.Products || []).reduce(
          (total, item) => {
            total += item.ProductRentalSum;
            return total;
          },
          0
        ),
        shipping: 0, // todo: missing
        vat: 0, // todo: missing
        total: this.orderReceipt?.order?.OrderTotal,
        paymentMethod: "", // todo: missing
        remark: this.orderReceipt?.order?.OrderComments,
        cvr: this.orderReceipt?.customer?.CustomerCompanyCVR
      };
    },
    customerInformation() {
      return {
        email: "[email protected]",
        telephone: this.orderReceipt?.customer.CustomerPhone
      };
    },
    addresses() {
      return {
        billing: `
          ${this.orderReceipt?.customer?.CustomerAddress}
          ${this.orderReceipt?.customer?.CustomerCity}
          ${this.orderReceipt?.customer?.CustomerCountry}
        `,
        shipping: `
          ${this.orderReceipt?.order?.OrderShippingAddress}
          ${this.orderReceipt?.order?.OrderShippingCity}
          ${this.orderReceipt?.order?.OrderShippingCountry}
        `
      };
    }
  },
  data() {
    return {
      items: []
    };
  },
  async created() {
    if (!this.orderReceipt) {
      this.$router.push("/");
    } else {
      this.items = await this.getItems();
    }
  },
  methods: {
    ...mapActions(["getProduct"]),
    async getItems() {
      const items = await Promise.all(
        (this.orderReceipt?.order?.Products || []).map(
          async item => {
            const product = await this.getProduct(item.ProductId).catch(
              e => null
            );
            console.log(product);

            return {
              slug: product?.info?.slug,
              title: product?.info?.name,
              amount: item.ProductQty,
              total: item.ProductRentalSum,
              noOfDays:
                1 +
                (new Date(item?.ProductRentalTo).getTime() -
                  new Date(item?.ProductRentalFrom).getTime()) /
                  (1000 * 60 * 60 * 24),
              startDate: item?.ProductRentalFrom,
              endDate: item?.ProductRentalTo
            };
          }
        )
      );
      return items;
    }
  }
};
</script>

<style lang="scss" scoped>
.message {
  font-size: 0.8em;
  color: #092d4f;
}
</style>
