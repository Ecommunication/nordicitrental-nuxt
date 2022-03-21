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
    products(locale: $locale, where: { _or: { Name_contains: $search } }) {
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
