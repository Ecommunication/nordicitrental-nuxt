const axios = require('axios');

const createSitemapRoutes = async () => {
  let routes = [];

  const { data } = await axios.get('https://nordic.nordicitrental.dk/products');

  for (const product of data) {
    routes.push({
      url: `https://nordicitrental.dk/produkt/${product.ProductSlug}`,
      changefreq: 'monthly',
      lastmod: new Date(product.updated_at),
    });
  }

  return routes;
};

export default createSitemapRoutes;
