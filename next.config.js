const { API_URL } = require("./config");

module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_URL}/:path*`, // Proxy to Backend
      },
    ];
  },
};
