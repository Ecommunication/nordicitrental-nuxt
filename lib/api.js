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
      PublishDate
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
      PublishDate
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
      confirmation
    }
  }
`;

export const GET_NEXT_AND_RREV_BLOGS = gql`
  query getNextAndPrevBlog($locale: String, $blogid: Int) {
    next: blogs(
      where: { id_gt: $blogid }
      locale: $locale
      limit: 1
      sort: "id:asc"
    ) {
      id
      published_at
      slug
    }
    previous: blogs(
      where: { id_lt: $blogid }
      locale: $locale
      limit: 1
      sort: "id:desc"
    ) {
      id
      published_at
      slug
    }
  }
`;
