let config = {
  apiHost: "http://localhost:5050",
  env: "development"
};

if (process.env.NODE_ENV === "production") {
  config = {
    apiHost: "https://fiftythree-server-jmwcnzhftq.now.sh",
    env: "production"
  };
}

export default config;
