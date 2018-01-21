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
      host: 'http://api.mycontentbird.test',
      port: 8000,
      url: 'http://api.mycontentbird.test:8000',
    },
    upload: uploadConfig,
    color,
  },
  local: {
    api: {
      host: 'http://api.mycontentbird.test',
      port: 8000,
      url: 'http://api.mycontentbird.test:8000',
    },
    upload: uploadConfig,
    color,
  },
  staging: {
    api: {
      host: 'https://stage1-backend.staging.mycontentbird.io',
      port: 80,
      url: 'https://stage1-backend.staging.mycontentbird.io',
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
