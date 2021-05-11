const express = require("express");
const router = express.Router();

router.post("/api/NewtonInterpolation", (req, res) => {
  var X = req.body.FindX;
  var x = [].concat(...req.body.xValue);
  var y = [].concat(...req.body.yValue);

  var interpolatePoint = [].concat(...req.body.interpolatePoint);
  var n = x.length - 1;

  function C(n) {
    if (n === 1) {
      return 0;
    } else {
      return (
        (y[interpolatePoint[n]] - y[interpolatePoint[n - 1]]) /
          (x[interpolatePoint[n]] - x[interpolatePoint[n - 1]]) -
        C(n - 1)
      );
    }
  }

  function findX(n, X) {
    if (n < 1) {
      return 1;
    } else {
      return (X - x[interpolatePoint[n]]) * findX(n - 1, X);
    }
  }

  fx = y[1];
  if (n === 2) {
    fx +=
      ((y[interpolatePoint[1]] - y[interpolatePoint[0]]) /
        (x[interpolatePoint[1]] - x[interpolatePoint[0]])) *
      (X - x[interpolatePoint[0]]);
  } else {
    for (var i = 2; i <= n; i++) {
      fx +=
        (C(i) / (x[interpolatePoint[i]] - x[interpolatePoint[1]])) *
        findX(i - 1, X);
    }
  }

  console.log(fx);

  res.json({
    out: fx,
  });
});
module.exports = router;