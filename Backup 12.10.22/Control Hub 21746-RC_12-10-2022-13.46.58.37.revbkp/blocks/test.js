// IDENTIFIERS_USED=_0AsDcMotor,_1AsDcMotor,_2AsDcMotor,_3AsDcMotor

/**
 * This function is executed when this Op Mode is selected from the Driver Station.
 */
function runOpMode() {
  _1AsDcMotor.setDirection("REVERSE");
  _0AsDcMotor.setDirection("REVERSE");
  linearOpMode.waitForStart();
  _0AsDcMotor.setDualPower(0.5, _1AsDcMotor, 0.5);
  _2AsDcMotor.setDualPower(0.5, _3AsDcMotor, 0.5);
  linearOpMode.sleep(2000);
  _0AsDcMotor.setDualPower(0, _1AsDcMotor, 0);
  _2AsDcMotor.setDualPower(0, _3AsDcMotor, 0);
  if (linearOpMode.opModeIsActive()) {
    while (linearOpMode.opModeIsActive()) {
      telemetry.update();
    }
  }
}
