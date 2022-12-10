// IDENTIFIERS_USED=_0AsDcMotor,_1AsDcMotor,_2AsDcMotor,_3AsDcMotor,gamepad1

var y, x, rx, denominator;

/**
 * This function is executed when this Op Mode is selected from the Driver Station.
 */
function runOpMode() {
  linearOpMode.waitForStart();
  if (linearOpMode.opModeIsActive()) {
    _0AsDcMotor.setDirection("REVERSE");
    _1AsDcMotor.setDirection("REVERSE");
    while (linearOpMode.opModeIsActive()) {
      y = 0.5 * gamepad1.getLeftStickY();
      x = -0.5 * gamepad1.getRightStickX();
      rx = gamepad1.getLeftStickX() * 0.5;
      denominator = Math.max.apply(null, [[Math.abs(y), Math.abs(x), Math.abs(rx)].reduce(function(x, y) {return x + y;}), 1]);
      _3AsDcMotor.setPower((y + x + rx) / denominator);
      _2AsDcMotor.setPower(((y - x) + rx) / denominator);
      _1AsDcMotor.setPower(((y - x) - rx) / denominator);
      _0AsDcMotor.setPower(((y + x) - rx) / denominator);
      telemetry.update();
    }
  }
}
