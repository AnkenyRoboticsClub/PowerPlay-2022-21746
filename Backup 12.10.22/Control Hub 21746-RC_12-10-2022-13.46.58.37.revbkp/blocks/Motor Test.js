/**
 * This function is executed when this Op Mode is selected from the Driver Station.
 */
function runOpMode() {
  m1AsDcMotor.setMode("RUN_WITHOUT_ENCODER");
  m2AsDcMotor.setDirection("REVERSE");
  linearOpMode.waitForStart();
  if (linearOpMode.opModeIsActive()) {
    while (linearOpMode.opModeIsActive()) {
      m1AsDcMotor.setPower(gamepad1.getLeftStickX());
      m2AsDcMotor.setPower(gamepad1.getLeftStickX() / 2 + gamepad1.getLeftStickY());
      m3AsDcMotor.setPower(gamepad1.getLeftStickX() / -2 + gamepad1.getLeftStickY());
      telemetry.update();
    }
  }
}
