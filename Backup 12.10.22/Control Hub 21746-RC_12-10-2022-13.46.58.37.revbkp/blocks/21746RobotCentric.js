// IDENTIFIERS_USED=_0AsDcMotor,_1AsDcMotor,_2AsDcMotor,_3AsDcMotor,ClawMotorAsServo,ExpansionHub2AsServoController,gamepad1,ViperslideMotorAsDcMotor

var encoder_position, y, x, rx, denominator;

/**
 * This function is executed when this Op Mode is selected from the Driver Station.
 */
function runOpMode() {
  ViperslideMotorAsDcMotor.setMode("STOP_AND_RESET_ENCODER");
  ViperslideMotorAsDcMotor.setPower(1);
  ViperslideMotorAsDcMotor.setTargetPosition(0);
  ViperslideMotorAsDcMotor.setMode("RUN_TO_POSITION");
  linearOpMode.waitForStart();
  if (linearOpMode.opModeIsActive()) {
    _1AsDcMotor.setDirection("REVERSE");
    _0AsDcMotor.setDirection("REVERSE");
    while (linearOpMode.opModeIsActive()) {
      if (gamepad1.getRightTrigger() > 0) {
        encoder_position = (typeof encoder_position == 'number' ? encoder_position : 0) + gamepad1.getRightTrigger() * 5;
      } else if (gamepad1.getB()) {
        encoder_position = 0;
      } else if (gamepad1.getLeftTrigger() > 0) {
        encoder_position = (typeof encoder_position == 'number' ? encoder_position : 0) + -(gamepad1.getLeftTrigger() * 5);
      }
      ViperslideMotorAsDcMotor.setTargetPosition(encoder_position);
      telemetry.addNumericData('Right Trigger', gamepad1.getRightTrigger());
      telemetry.addNumericData('Left trigger', gamepad1.getLeftTrigger());
      telemetry.addNumericData('encoder position', encoder_position);
      y = 0.5 * gamepad1.getLeftStickY();
      x = -0.5 * gamepad1.getRightStickX();
      rx = gamepad1.getLeftStickX() * 0.5;
      denominator = Math.max.apply(null, [[Math.abs(y), Math.abs(x), Math.abs(rx)].reduce(function(x, y) {return x + y;}), 1]);
      _3AsDcMotor.setPower((y + x + rx) / denominator);
      _2AsDcMotor.setPower(((y - x) + rx) / denominator);
      _1AsDcMotor.setPower(((y - x) - rx) / denominator);
      _0AsDcMotor.setPower(((y + x) - rx) / denominator);
      if (gamepad1.getA()) {
        ExpansionHub2AsServoController.pwmEnable();
        telemetry.addNumericData('Servo set to 0.5', 123);
        ClawMotorAsServo.setPosition(0.78);
      } else {
        ClawMotorAsServo.setPosition(0.5);
      }
      telemetry.update();
    }
  }
}
