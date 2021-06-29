const express = require("express");
const auth = require("./auth");

module.exports = (app) => {
  const protectedApi = express.Router();
  app.use("/api", protectedApi);

  protectedApi.use(auth);

  const BillingCycle = require("../api/billingCycle/billingCycleService");
  BillingCycle.register(protectedApi, "/billingCycles");

  //

  const openApi = express.Router();
  app.use("/oapi", openApi);

  const AuthService = require("../api/user/authService");
  openApi.post("/login", AuthService.login);
  openApi.post("/signup", AuthService.signup);
  openApi.post("/validateToken", AuthService.validateToken);
};
