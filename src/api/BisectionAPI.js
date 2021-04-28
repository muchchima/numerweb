const express = require("express");
const router = express.Router();
const math = require("mathjs");
/**
 * @swagger
 *  tags:
 *   name: Bisection
 *   description: Get all books
 * 
 */

/**
 * @swagger
 * /api/BisectionAPI:
 *   get:
 *     tags: [Bisection]
 *     responses:
 *       201:
 *         description: GET
 */

 /**
 * @swagger
 * /api/BisectionAPI:
 *   post:
 *     parameters:
 *      - name: equation
 *      - name: xl
 *      - name: xr
 *     tags: [Bisection]
 *     responses:
 *       201:
 *         description: post data
 */


router.post("/api/BisectionAPI", (req, res) => {
  var eq = math.compile(req.body.equation);
  var xl = parseFloat(req.body.xl);
  var xr = parseFloat(req.body.xr);
  var xm = 0;
  var n = 0;
  var check = parseFloat(0.0);
  var tmpArr = [];

  const findxm = (xl, xr) => {
    return (parseFloat(xl) + parseFloat(xr)) / 2;
  };

  do {
    let XL = {
      x: xl,
    };
    let XR = {
      x: xr,
    };

    xm = findxm(xl, xr);
    n++;
    if (eq.evaluate(XL) * eq.evaluate(XR) > 0) {
      check = Math.abs((xm - xl) / xm).toFixed(8);
      xl = xm;
    } else {
      check = Math.abs((xm - xr) / xm).toFixed(8);
      xr = xm;
    }

    tmpArr.push({
      iteration: n,
      xl: xl,
      xr: xr,
      xm: xm,
      Error: check,
    });
  } while (check > 0.000001 && n < 25);

  res.json({
    tmpArr: tmpArr,
  });
});
module.exports = router;


