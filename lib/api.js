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
export const GET_BLOG_PAGE_AND_BLOGS = gql`
  query getBlogPageAndBlogs($locale: String) {
    blogpage(locale: $locale) {
      ImageCover {
        url
        alternativeText
      }
      TextCover
      MetaTitle
      MetaDescription
      PageTitle
    }
    blogs(locale: $locale, sort: "published_at:desc") {
      id
      published_at
      Headline
      Subline
      slug
      FeatureImage {
        url
        alternativeText
      }
    }
  }
`;
export const GET_BLOG_BY_SLUG = gql`
  query getBlogBySlug($locale: String, $slug: String) {
    blogs(where: { locale: $locale, slug: $slug }) {
      id
      published_at
      Headline
      Subline
      Content
      slug
      FeatureImage {
        url
        name
        formats
        alternativeText
      }
    }
  }
`;

export const GET_CONTACT_FORM_TEXTS = gql`
  query getContactFormTexts($locale: String) {
    contactForm(locale: $locale) {
      name
      email
      company
      phone
      message
    }
  }
`;
