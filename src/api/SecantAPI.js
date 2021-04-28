const express = require('express');
const router = express.Router();
const math = require('mathjs');

/**
 * @swagger
 *  tags:
 *   name: SecantAPI
 *   description: Get all books
 * 
 */

/**
 * @swagger
 * /api/SecantAPI:
 *   get:
 *     tags: [SecantAPI]
 *     responses:
 *       201:
 *         description: GET
 */

 /**
 * @swagger
 * /api/SecantAPI:
 *   post:
 *     parameters:
 *      - name: equation
 *      - name: xl
 *      - name: xr
 *     tags: [SecantAPI]
 *     responses:
 *       201:
 *         description: post data
 */

router.post('/api/SecantAPI', (req, res) => {
    var eq = math.compile(req.body.equation);
    var x0 = parseFloat(req.body.x0);
    var x1 = parseFloat(req.body.x1);
    var x_new = 0;
    var i = 0;
    var check = parseFloat(0.000000);
    var tmpArr = [];

    do {
        i++;
        let X = {
            x: x0
        };
        let Xi = {
            x: x1
        };

        DiffX = (eq.evaluate(X) - eq.evaluate(Xi)) / (x0 - x1);
        x_new = x1 - (eq.evaluate(Xi) / DiffX);

        check = math.abs((x_new - x1) / x_new).toFixed(8);;

        tmpArr.push({
            'iteration': i,
            'x0': x0,
            'x1': x1,
            'x_new': x_new,
            'Error': check,
        });

        x0 = x1;
        x1 = x_new;

    } while (check > 0.0001);
    console.log(eq.evaluate({x:x_new}));

    res.json({
        tmpArr: tmpArr
    })
});
module.exports = router;

