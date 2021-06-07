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
  constructor(data) {
    this._data = data;
    this.info = {
      id: data.id,
      slug: data.ProductSlug,
      name: data.Name
    };
    this.cover = {
      image: formatImage(data.ImageCover.url),
      text: data.TextCover
    };
    this.meta = {
      title: data.MetaTitle,
      desc: data.MetaDescription
    };
    this.gallery = {
      main: formatImage(data.MainImage.url),
      thumbnails: data.ProductGallery.map(img => formatImage(img.url))
    };
    this.pricing = {
      daily: data.DailyPriceAfterWeek,
      weekly: data.WeekPrice
    };
    this.descriptions = {
      short: data.DescriptionShort,
      long: data.DescriptionLong
    };
    this.icons = data.ProductSpecifications;
  }
}

export class Category {
  constructor(data) {
    this.cover = {
      text: data.TextCover,
      image: formatImage(data.ImageCover.url)
    };
    this.meta = {
      title: data.MetaTitle,
      desc: data.MetaDescription
    };
    this.description = data.Description;
    this.products = data.products.map(product => new Product(product));
  }
}

export class Cart {
  constructor() {
    this.items = [];
    this.shipping = SHIPMENT_METHODS.DELIVERY;
  }
}

export class Order {
  constructor(items, shipping, customer) {
    console.log({
      items,
      shipping,
      customer
    });
  }
}
