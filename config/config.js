//server-side configuration related variables

const config = {
  //differentiate between dev & production
  env: process.env.NODE_ENV || "development",
  //define the listening port for the server
  port: process.env.PORT || 3000,
  //secret key to be used to sign JWT
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  //location of mongoDB database instance for the project
  mongoUri:
    process.env.MONGO_HOST ||
    "mongodb://" +
      (process.env.IP || "localhost") +
      ":" +
      (process.env.MONGO_PORT || "27017") +
      "/mernproject",
};

export default config;
