const express = require("express");
const router = express.Router();
const math = require("mathjs");

router.post("/api/JacobiAPI", (req, res) => {
  var MatrixA = req.body.matrixA;
  var MatrixB = [].concat(...req.body.matrixB);
  var MatrixX = [].concat(...req.body.matrixX);
  var solution = [];
  var n = MatrixA.length;
  var x = [];
  var temp;
  var xold;
  epsilon = new Array(n);
  do {
    temp = [];
    xold = JSON.parse(JSON.stringify(x));
    for (var i = 0; i < n; i++) {
      var sum = 0;
      for (var j = 0; j < n; j++) {
        if (i !== j) {
          //else i == j That is a divide number
          sum = sum + MatrixA[i][j] * MatrixX[j];
        }
      }
      temp[i] = (MatrixB[i] - sum) / MatrixA[i][i]; //update x[i]
    }
    x = JSON.parse(JSON.stringify(temp));
  } while (error(x, xold));

  function error(xnew, xold) {
    for (var i = 0; i < xnew.length; i++) {
      epsilon[i] = Math.abs((xnew[i] - xold[i]) / xnew[i]);
    }
    for (i = 0; i < epsilon.length; i++) {
      if (epsilon[i] > 0.000001) {
        return true;
      }
    }
    return false;
  }

  solution = x;
  console.log(solution);

  res.json({
    out: solution,
  });
});
module.exports = router;
