// IDENTIFIERS_USED=gamepad1,ViperslidemotorAsDcMotor

var encoder_position;

/**
 * This function is executed when this Op Mode is selected from the Driver Station.
 */
function runOpMode() {
  ViperslidemotorAsDcMotor.setMode("STOP_AND_RESET_ENCODER");
  ViperslidemotorAsDcMotor.setPower(1);
  ViperslidemotorAsDcMotor.setTargetPosition(0);
  ViperslidemotorAsDcMotor.setMode("RUN_TO_POSITION");
  linearOpMode.waitForStart();
  if (linearOpMode.opModeIsActive()) {
    while (linearOpMode.opModeIsActive()) {
      if (gamepad1.getRightTrigger() > 0) {
        encoder_position = (typeof encoder_position == 'number' ? encoder_position : 0) + gamepad1.getRightTrigger() * 10;
      } else if (gamepad1.getB()) {
        encoder_position = 0;
      } else if (gamepad1.getLeftTrigger() > 0) {
        encoder_position = (typeof encoder_position == 'number' ? encoder_position : 0) + -(gamepad1.getLeftTrigger() * 10);
      }
      ViperslidemotorAsDcMotor.setTargetPosition(encoder_position);
      telemetry.addNumericData('Right trigger', gamepad1.getRightTrigger());
      telemetry.addNumericData('Left trigger', gamepad1.getLeftTrigger());
      telemetry.addNumericData('encoder position', encoder_position);
      telemetry.addNumericData('encoder position', encoder_position);
      telemetry.update();
    }
  }
}
