require('babel-polyfill');

const uploadConfig = {
  avatar: {
    ext: 'image/jpeg,image/jpg,image/png',
    maxSize: 5e+6,
  },
};

// put your colors here to use in styled components
const color = {
  warning: '#CB4650',
  tableBorder: '#e9ecef',
  error: '#E96B13',
  green: '#55CE63',
};

const environment = {
  development: {
    api: {
      host: '159.65.2.196',
      port: 3000,
      url: 'http://159.65.2.196:3000',
    },
    upload: uploadConfig,
    color,
  },
  local: {
    api: {
      host: '159.65.2.196',
      port: 3000,
      url: 'http://159.65.2.196:3000',
    },
    upload: uploadConfig,
    color,
  },
  staging: {
    api: {
      host: '159.65.2.196',
      port: 3000,
      url: 'http://159.65.2.196:3000',
    },
    upload: uploadConfig,
    color,
  },
  test: {
    api: {
      host: 'http://localhost',
      port: 8000,
      url: 'http://localhost:8000',
    },
    upload: uploadConfig,
    color,
  },

}[process.env.NODE_ENV || 'development'];

module.exports = environment;
