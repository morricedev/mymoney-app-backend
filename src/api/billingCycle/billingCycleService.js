const BillingCycle = require("./billingCycle");
const errorHandler = require("../common/errorHandler");

BillingCycle.methods(["get", "post", "put", "delete"]);
BillingCycle.updateOptions({ new: true, runValidators: true });
BillingCycle.after("post", errorHandler).after("put", errorHandler);

BillingCycle.route("get", (req, res, next) => {
  BillingCycle.find({}, (err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      res.status(500).json({ errors: [err] });
    }
  })
    .skip(req.query.skip)
    .limit(req.query.limit)
    .sort(JSON.parse(req.query.sort));
});

BillingCycle.route("count", (req, res, next) => {
  BillingCycle.count((err, value) => {
    if (!err) {
      res.json({ value });
    } else {
      res.status(500).json({ errors: [err] });
    }
  });
});

BillingCycle.route("summary", (req, res, next) => {
  BillingCycle.aggregate(
    [
      {
        $project: {
          credit: { $sum: "$credits.value" },
          debt: { $sum: "$debts.value" },
        },
      },
      {
        $group: {
          _id: null,
          credit: { $sum: "$credit" },
          debt: { $sum: "$debt" },
        },
      },
      {
        $project: { _id: 0, credit: 1, debt: 1 },
      },
    ],
    (err, result) => {
      if (!err) {
        res.json(result[0] || { credit: 0, debt: 0 });
      } else {
        res.status(500).json({ errors: [err] });
      }
    }
  );
});

module.exports = BillingCycle;
