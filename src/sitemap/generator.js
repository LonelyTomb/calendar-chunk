import { sitemapBuilder as buildSitemap } from 'react-router-sitemap';
import path from 'path'; // add path which will be needed for file write
import fs from 'fs'; // import file system object
import routes from './routes';

require('dotenv').config();
// use your website root address here. Optimally you can
// include dev and production enviorenments with variables
// const {
//   REACT_APP_API_URL, PUBLIC_URL, NODE_ENV,
// } = process.env;
// const hostname = NODE_ENV === 'development' ? 'http://localhost:3000' : (REACT_APP_API_URL || PUBLIC_URL || 'https://www.wazikilife.com');

const hostname = 'https://www.wazikilife.com';
// define our destination folder and sitemap file name
const dest = path.resolve('./public', 'sitemap.xml');

const sitemap = buildSitemap(hostname, routes);

// write sitemap.xml file in /public folder
// Access the sitemap content by converting it with .toString() method
fs.writeFileSync(dest, sitemap.toString());