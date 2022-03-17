import { gql } from "apollo-boost";
import { getApolloClient } from "./apollo-client";

export const getAllProductsOverview = async () => {
  const apolloClient = getApolloClient();
  try {
    return await apolloClient.query({
      query: gql`
        query getAllProductsOverview {
          products(limit: 4000) {
            Name
            id
            DailyPrice 
            DailyPriceAfterWeek
            DescriptionShort
            MainImage {
              url
              alternativeText
            }
          }
        }
      `,
    });
  } catch (e) {
    console.log(`Failed to query products. Error: ${e.message}`);
    throw e;
  }
};
