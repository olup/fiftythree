let config = {
  apiHost: "http://localhost:5050",
  env: "development"
};

if (process.env.NODE_ENV === "production") {
  config = {
    apiHost: "http://myRemoteIp:MyRemotePort",
    env: "production"
  };
}

export default config;
