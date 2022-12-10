// IDENTIFIERS_USED=_0AsDcMotor,_1AsDcMotor,_2AsDcMotor,_3AsDcMotor

/**
 * This function is executed when this Op Mode is selected from the Driver Station.
 */
function runOpMode() {
  linearOpMode.waitForStart();
  _0AsDcMotor.setDirection("REVERSE");
  _0AsDcMotor.setDualPower(0.75, _2AsDcMotor, 0.75);
  _3AsDcMotor.setDualPower(0.75, _1AsDcMotor, 0.75);
  linearOpMode.sleep(10000);
  _0AsDcMotor.setDualPower(0, _2AsDcMotor, 0);
  _3AsDcMotor.setDualPower(0, _1AsDcMotor, 0);
  linearOpMode.sleep(500);
  _0AsDcMotor.setDualPower(0.75, _2AsDcMotor, 0.25);
  _3AsDcMotor.setDualPower(0.25, _1AsDcMotor, 0.75);
  linearOpMode.sleep(1000);
  _0AsDcMotor.setDualPower(0.75, _2AsDcMotor, 0.25);
  _3AsDcMotor.setDualPower(0.25, _1AsDcMotor, 0.75);
  linearOpMode.sleep(1000);
  if (linearOpMode.opModeIsActive()) {
    while (linearOpMode.opModeIsActive()) {
      telemetry.update();
    }
  }
}
