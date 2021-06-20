import { formatImage } from "../plugins/globals";

export const SHIPMENT_METHODS = {
  PICK_UP: {
    cost: 0,
    method: "pick-up"
  },
  DELIVERY: {
    cost: 800,
    method: "delivery"
  }
};

export class Product {
  constructor(data, categories = []) {
    if (!data) return {};

    console.log(data);

    this._data = data;
    this.info = {
      id: data.id,
      slug: data.ProductSlug,
      name: data.Name
    };
    this.cover = {
      image: formatImage(data?.ImageCover?.url || ""),
      text: data.TextCover
    };
    this.meta = {
      title: data.MetaTitle,
      desc: data.MetaDescription
    };
    this.gallery = {
      main: formatImage(data?.MainImage?.url || ""),
      thumbnails: data.ProductGallery.map(img => formatImage(img?.url || ""))
    };
    this.pricing = {
      daily: parseFloat(data.DailyPriceAfterWeek),
      weekly: parseFloat(data.DailyPrice * 8)
    };
    this.descriptions = {
      short: data.DescriptionShort,
      long: data.DescriptionLong
    };
    this.features = (data.ProductAttributes || []).map(attr => ({
      key: attr.AttributeKey,
      value: attr.AttributeValue
    }));
    this.categories = categories;
    this.options = this.getProductOptions(data.ProductOptionsP, categories);
    this.upsell = (data?.ProductsUpsell || []).map(p => new Product(p));
  }

  getProductOptions(optsFromProduct = [], categories = []) {
    const productOptionsFromCategory = [];

    categories
      .map(cat => cat.ProductOptionsP)
      .forEach(opts => {
        productOptionsFromCategory.push(...opts);
      });

    const options = [...optsFromProduct, ...productOptionsFromCategory];
    const uniqueOptionIds = [...new Set(options.map(o => o.id))];

    return uniqueOptionIds.map(id => options.find(o => o.id === id));
  }
}

export class Category {
  constructor(data) {
    if (!data) return {};

    this.cover = {
      text: data.TextCover,
      image: formatImage(data?.ImageCover?.url || "")
    };
    this.meta = {
      title: data.MetaTitle,
      desc: data.MetaDescription
    };
    this.description = data.Description;
    this.products = data.products.map(product => new Product(product));
    this.upsell = (data?.CategoryUpsell || []).map(cat => ({
      Image: cat.UpsellIcon,
      Title: cat.Name,
      Slug: cat.Slug
    }))
  }
}

export class Cart {
  constructor() {
    this.items = [];
    this.shipping = SHIPMENT_METHODS.DELIVERY;
  }
}

export class Order {
  constructor(customerId, items, shipping, shippingAdd, comments) {
    console.log({
      customerId,
      items,
      shipping,
      shippingAdd,
      comments
    });

    this.Products = this.processItems(items);
    this.CustomerId = customerId;
    this.OrderComments = comments || "";
    this.OrderShippingFirstName = shippingAdd.firstName || "";
    this.OrderShippingLastName = shippingAdd.lastName || "";
    this.OrderShippingCompany = shippingAdd.companyName || "";
    this.OrderShippingAddress = shippingAdd.streetNameAndNo || "";
    this.OrderShippingCity = shippingAdd.town || "";
    this.OrderShippingZip = shippingAdd.zipCode || "";
    this.OrderShippingCountry = shippingAdd.country || "";
    this.ShippingHandling = shipping.method || "";
    this.OrderTotal = this.getOrderTotal(items, shipping.cost);
  }

  processItems(items) {
    return items.map(item => {
      return {
        ProductId: item.productId,
        ProductName: item.product?.info?.name || "",
        ProductRentalFrom: item.startDate,
        ProductRentalTo: item.endDate,
        ProductRentalSum: item.price,
        ProductQty: item.amount,
        ProductOptions: item.productOptions.map(po => ({
          ProductName: po.name,
          ProductPrice: po.price
        }))
      };
    });
  }

  getOrderTotal(items, shippingCost) {
    const itemsCost = items.reduce((total, item) => {
      total += item.price;
      return total;
    }, 0);
    return itemsCost + shippingCost;
  }
}

export class Customer {
  constructor(data) {
    this.CustomerFirstName = data.firstName || "";
    this.CustomerLastName = data.lastName || "";
    this.CustomerEmail = data.email || "";
    this.CustomerCompanyName = data.companyName || "";
    this.CustomerAddress = data.streetNameAndNo || "";
    this.CustomerCity = data.town || "";
    this.CustomerZip = data.zipCode || "";
    this.CustomerCountry = data.country || "";
    this.CustomerPhone = data.phone || "";
    this.CustomerCompanyCVR = data.cvrNumber || "";
  }
}
