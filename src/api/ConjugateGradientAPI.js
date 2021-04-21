const express = require("express");
const router = express.Router();
const math = require("mathjs");

router.post("/api/ConjugateGradientAPI", (req, res) => {
  var MatrixA = req.body.matrixA;
  var MatrixB = [].concat(...req.body.matrixB);
  var solution = [];
  var n = MatrixA.length;
  var x = [].concat(...req.body.matrixX);

  function positive_definite(dimention) {
    var tempMatrix = [];
    for (var i = 0; i < dimention; i++) {
      tempMatrix[i] = [];
      for (var j = 0; j < dimention; j++) {
        tempMatrix[i][j] = MatrixA[i][j];
      }
    }
    if (math.det(tempMatrix) <= 0) {
      return false;
    }
    if (dimention !== n - 1) {
      return positive_definite(++dimention);
    }
    return true;
  }

  if (!positive_definite(1)) {
    solution = "This matrix doesn't positive definite";
    return false;
  }
  //find {R0}
  var R = math.subtract(math.multiply(MatrixA, x), MatrixB);
  //find D0
  var D = math.multiply(R, -1);
  do {
    //find λ
    var λ =
      math.multiply(math.multiply(math.transpose(D), R), -1) /
      math.multiply(math.multiply(math.transpose(D), MatrixA), D);
    /*------------------------------------------------------------------*/

    //find new {X}
    x = math.add(x, math.multiply(λ, D));
    //find new {R}
    R = math.subtract(math.multiply(MatrixA, x), MatrixB);
    //find epsilon
    epsilon = Math.sqrt(math.multiply(math.transpose(R), R)).toFixed(8);
    var α =
      math.multiply(math.multiply(math.transpose(R), MatrixA), D) /
      math.multiply(math.transpose(D), math.multiply(MatrixA, D)).toFixed(8);
    D = math.add(math.multiply(R, -1), math.multiply(α, D));
  } while (epsilon > 0.000001);
  solution = x;

  console.log(solution);

  res.json({
    out: solution,
  });
});
module.exports = router;
