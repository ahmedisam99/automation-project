const url = require('url');
const { join } = require('path');

const final = url.format({
  pathname: join(__dirname, 'utils', 'menu_bar.js'),
  protocol: 'file',
//   slashes: true,
});

console.log(final);
