import { createIPX, createIPXMiddleware } from 'ipx';

// https://github.com/unjs/ipx
const ipx = createIPX({
  dir: 'assets/ipx_images/', // absolute path to images dir
  domains: [process.env.API_URL], // allowed external domains (should match domains option in nuxt.config)
  alias: {}, // base alias
  sharp: {}, // sharp options
});

export default createIPXMiddleware(ipx);
