// IDENTIFIERS_USED=gamepad1,m1AsDcMotor,m2AsDcMotor,m3AsDcMotor

var TurnX;

/**
 * This function is executed when this Op Mode is selected from the Driver Station.
 */
function runOpMode() {
  m1AsDcMotor.setMode("RUN_WITHOUT_ENCODER");
  m2AsDcMotor.setDirection("REVERSE");
  linearOpMode.waitForStart();
  if (linearOpMode.opModeIsActive()) {
    while (linearOpMode.opModeIsActive()) {
      TurnX = gamepad1.getRightStickX();
      m1AsDcMotor.setPower(gamepad1.getLeftStickX() + TurnX);
      m2AsDcMotor.setPower((gamepad1.getLeftStickX() / 2 + gamepad1.getLeftStickY()) - TurnX);
      m3AsDcMotor.setPower(gamepad1.getLeftStickX() / -2 + gamepad1.getLeftStickY() + TurnX);
      telemetry.update();
    }
  }
}
