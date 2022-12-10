// IDENTIFIERS_USED=_0AsDcMotor,_1AsDcMotor,_2AsDcMotor,_3AsDcMotor

/**
 * This function is executed when this Op Mode is selected from the Driver Station.
 */
function runOpMode() {
  _2AsDcMotor.setDirection("REVERSE");
  _3AsDcMotor.setDirection("REVERSE");
  linearOpMode.waitForStart();
  _0AsDcMotor.setDualPower(0.6, _1AsDcMotor, 0.6);
  _2AsDcMotor.setDualPower(0.15, _3AsDcMotor, 0.15);
  linearOpMode.sleep(2200);
  _0AsDcMotor.setDualPower(0, _1AsDcMotor, 0);
  _2AsDcMotor.setDualPower(0, _3AsDcMotor, 0);
  if (linearOpMode.opModeIsActive()) {
    while (linearOpMode.opModeIsActive()) {
      telemetry.update();
    }
  }
}
