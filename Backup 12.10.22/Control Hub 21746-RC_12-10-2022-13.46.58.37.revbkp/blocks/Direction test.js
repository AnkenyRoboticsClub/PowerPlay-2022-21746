// IDENTIFIERS_USED=_0AsDcMotor,_1AsDcMotor,_2AsDcMotor,_3AsDcMotor

/**
 * Describe this function...
 */
function go_left() {
  // Display the location of the bottom right corner
  // of the detection boundary for the recognition
  telemetryAddTextData('go', 'left');
  _1AsDcMotor.setDirection("FORWARD");
  _0AsDcMotor.setDirection("FORWARD");
  _2AsDcMotor.setDirection("REVERSE");
  _3AsDcMotor.setDirection("REVERSE");
  _0AsDcMotor.setDualPower(0.5, _1AsDcMotor, 0.5);
  _2AsDcMotor.setDualPower(0.5, _3AsDcMotor, 0.5);
  linearOpMode.sleep(1500);
  _0AsDcMotor.setDualPower(0, _1AsDcMotor, 0);
  _2AsDcMotor.setDualPower(0, _3AsDcMotor, 0);
}

/**
 * Describe this function...
 */
function go_forward() {
  // Display the location of the bottom right corner
  // of the detection boundary for the recognition
  telemetryAddTextData('go', 'forward');
  _1AsDcMotor.setDirection("FORWARD");
  _3AsDcMotor.setDirection("FORWARD");
  _2AsDcMotor.setDirection("REVERSE");
  _0AsDcMotor.setDirection("REVERSE");
  _0AsDcMotor.setDualPower(0.5, _1AsDcMotor, 0.5);
  _2AsDcMotor.setDualPower(-0.5, _3AsDcMotor, -0.5);
  linearOpMode.sleep(1500);
  _0AsDcMotor.setDualPower(0, _1AsDcMotor, 0);
  _2AsDcMotor.setDualPower(0, _3AsDcMotor, 0);
}

/**
 * This function is executed when this Op Mode is selected from the Driver Station.
 */
function runOpMode() {
  linearOpMode.waitForStart();
  if (linearOpMode.opModeIsActive()) {
    go_forward();
    linearOpMode.sleep(1000);
    go_left();
    telemetry.update();
  }
}
