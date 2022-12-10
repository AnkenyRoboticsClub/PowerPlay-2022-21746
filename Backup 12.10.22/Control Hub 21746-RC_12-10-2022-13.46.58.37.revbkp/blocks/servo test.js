// IDENTIFIERS_USED=ClawMotorAsServo,ExpansionHub2AsServoController,gamepad1

/**
 * This function is executed when this Op Mode is selected from the Driver Station.
 */
function runOpMode() {
  linearOpMode.waitForStart();
  if (linearOpMode.opModeIsActive()) {
    while (linearOpMode.opModeIsActive()) {
      if (gamepad1.getA()) {
        ExpansionHub2AsServoController.pwmEnable();
        ClawMotorAsServo.setPosition(0.5);
        telemetry.addNumericData('servo set to 0.5', 0.5);
      } else {
        ClawMotorAsServo.setPosition(0);
      }
      telemetry.update();
      telemetry.addNumericData('key', 123);
    }
  }
}
