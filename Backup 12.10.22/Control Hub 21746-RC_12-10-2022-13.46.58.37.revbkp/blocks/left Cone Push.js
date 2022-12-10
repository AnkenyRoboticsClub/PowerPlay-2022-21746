// IDENTIFIERS_USED=_0AsDcMotor,_1AsDcMotor,_2AsDcMotor,_3AsDcMotor

/**
 * This function is executed when this Op Mode is selected from the Driver Station.
 */
function runOpMode() {
  _2AsDcMotor.setDirection("REVERSE");
  _3AsDcMotor.setDirection("REVERSE");
  linearOpMode.waitForStart();
  _0AsDcMotor.setDualPower(0.75, _1AsDcMotor, -0.75);
  _2AsDcMotor.setDualPower(-0.75, _3AsDcMotor, 0.75);
  linearOpMode.sleep(3000);
  _0AsDcMotor.setDualPower(0, _1AsDcMotor, 0);
  _2AsDcMotor.setDualPower(0, _3AsDcMotor, 0);
  linearOpMode.sleep(500);
  _0AsDcMotor.setDualPower(-0.75, _1AsDcMotor, 0.75);
  _2AsDcMotor.setDualPower(0.75, _3AsDcMotor, -0.75);
  linearOpMode.sleep(50);
  _0AsDcMotor.setDualPower(0, _1AsDcMotor, 0);
  _2AsDcMotor.setDualPower(0, _3AsDcMotor, 0);
  if (linearOpMode.opModeIsActive()) {
    while (linearOpMode.opModeIsActive()) {
      telemetry.update();
    }
  }
}
