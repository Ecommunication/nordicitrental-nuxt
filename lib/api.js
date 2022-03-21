import gql from 'graphql-tag';

export const GET_PRODUCTPAGE_TEXTS = gql`
  query getProductPageTexts($locale: String) {
    produktside(locale: $locale) {
      FirstWeekPriceText
      DailyPriceText
      AddOptionsText
      AddOptionsText
      RentalPeriodText
      Start
      End
      TotalPeriodText
      DaysText
      RentalPeriodErrorText
      AddToCartText
      SuggestionsText
      AddedToCartText
      CartRentalPeriodText
      TotalPriceText
      ContinueBrowsingText
      OrderText
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  query getAllProductsOverview($locale: String, $search: String) {
    products(
      locale: $locale
      where: {
        _or: {
          Name_contains: $search
          product_categories: { Name_contains: $search }
        }
      }
    ) {
      Name
      id
      ProductSlug
      DailyPrice
      ProductAttributes {
        id
        AttributeKey
        AttributeValue
      }
      product_categories {
        Name
      }
      MainImage {
        url
        alternativeText
      }
    }
  }
`;

export const GET_ONE_PRODUCTS = gql`
  query getOneProduct($slug: String, $locale: String) {
    products(where: { ProductSlug: $slug }, locale: $locale) {
      Name
      id
      ProductSlug
      DailyPrice
      ProductAttributes {
        id
        AttributeKey
        AttributeValue
      }
      product_categories {
        Name
      }
      MainImage {
        url
        alternativeText
      }
      localizations {
        ProductSlug
        locale
      }
    }
  }
`;
