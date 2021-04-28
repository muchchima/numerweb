const express = require('express');
const router = express.Router();
const math = require('mathjs');
/**
 * @swagger
 *  tags:
 *   name: FalsePosAPI
 *   description: Get all books
 * 
 */

/**
 * @swagger
 * /api/FalsePosAPI:
 *   get:
 *     tags: [FalsePosAPI]
 *     responses:
 *       201:
 *         description: GET
 */

 /**
 * @swagger
 * /api/FalsePosAPI:
 *   post:
 *     parameters:
 *      - name: equation
 *      - name: xl
 *      - name: xr
 *     tags: [FalsePosAPI]
 *     responses:
 *       201:
 *         description: post data
 */

router.post('/api/FalsePosAPI', (req, res) => {
  var eq = math.compile(req.body.equation);
  var xl = parseFloat(req.body.xl);
  var xr = parseFloat(req.body.xr);
  var xm = 0;
  var n = 0;
  var check = parseFloat(0.000000);
  var tmpArr = [];

  let XL = {
    x: xl
  };
  let XR = {
    x: xr
  };
  let XM = {
    x: xm
  };


  const findxm = (xl, xr) => {
    return (parseFloat(xl) * eq.evaluate(XR) - parseFloat(xr) * eq.evaluate(XL)) / (eq.evaluate(XR) - eq.evaluate(XL))
  }

  do {

    xm = findxm(xl, xr);
    n++;

    if (eq.evaluate(XL) * eq.evaluate(XM) < 0) {
      check = Math.abs((xm - xl) / xm).toFixed(8);
      xr = xm;
    } else if (eq.evaluate(XM) * eq.evaluate(XR) < 0) {
      check = Math.abs((xm - xr) / xm).toFixed(8);
      xl = xm;
    }

    tmpArr.push({
      'iteration': n,
      'xl': xl,
      'xr': xr,
      'xm': xm,
      'Error': check,
    });

  } while (check > 0.000001 && n < 25)
  console.log(eq.evaluate({x:xm}));

  res.json({
    tmpArr: tmpArr

  })
});
module.exports = router;

