package org.firstinspires.ftc.teamcode;

import com.qualcomm.robotcore.eventloop.opmode.LinearOpMode;
import com.qualcomm.robotcore.hardware.ServoController;
import com.qualcomm.robotcore.hardware.Servo;
import com.qualcomm.hardware.bosch.BNO055IMU;
import com.qualcomm.robotcore.eventloop.opmode.TeleOp;
import com.qualcomm.robotcore.hardware.DcMotor;
import com.qualcomm.robotcore.hardware.DcMotorSimple;

@TeleOp(name = "21746 Field Centric (v4)")
public class FieldCentricMecanumTeleOpv4 extends LinearOpMode {
    @Override
    public void runOpMode() throws InterruptedException {
        int encoder_position = 0;
        // Declare our motors
        // Make sure your ID's match your configuration
        DcMotor motorFrontLeft = hardwareMap.dcMotor.get("3");
        DcMotor motorBackLeft = hardwareMap.dcMotor.get("2");
        DcMotor motorFrontRight = hardwareMap.dcMotor.get("0");
        DcMotor motorBackRight = hardwareMap.dcMotor.get("1");
        DcMotor ViperslideMotor = hardwareMap.get(DcMotor.class, "Viperslide Motor");
        ServoController ExpansionHub2_ServoController = hardwareMap.get(ServoController.class, "Expansion Hub 2");
        Servo ClawMotor = hardwareMap.get(Servo.class, "Claw Motor");
    
        // Reverse the right side motors
        // Reverse left motors if you are using NeveRests
        motorFrontLeft.setDirection(DcMotorSimple.Direction.REVERSE);
        motorBackLeft.setDirection(DcMotorSimple.Direction.REVERSE);

        // Retrieve the IMU from the hardware map
        BNO055IMU imu = hardwareMap.get(BNO055IMU.class, "imu");
        BNO055IMU.Parameters parameters = new BNO055IMU.Parameters();
        // Technically this is the default, however specifying it is clearer
        parameters.angleUnit = BNO055IMU.AngleUnit.RADIANS;
        // Without this, data retrieving from the IMU throws an exception
        imu.initialize(parameters);
        ViperslideMotor.setMode(DcMotor.RunMode.STOP_AND_RESET_ENCODER);
        ViperslideMotor.setPower(1);
        ViperslideMotor.setTargetPosition(0);
        ViperslideMotor.setMode(DcMotor.RunMode.RUN_TO_POSITION);
        waitForStart();

        if (isStopRequested()) return;
        double speed = 0.5;
        while (opModeIsActive()) {
            if (gamepad1.right_trigger > 0) {
                encoder_position += gamepad1.right_trigger * 5;
            } else if (gamepad1.b) {
                encoder_position = 0;
            } else if (gamepad1.left_trigger > 0) {
                encoder_position += -(gamepad1.left_trigger * 5);
            }
            ViperslideMotor.setTargetPosition(encoder_position);
            telemetry.addData("Right Trigger", gamepad1.right_trigger);
            telemetry.addData("Left trigger", gamepad1.left_trigger);
            telemetry.addData("encoder position", encoder_position);
            double x = -gamepad1.left_stick_y * speed; // Remember, this is reversed!
            double y = -gamepad1.left_stick_x * 1.1 * speed; // Counteract imperfect strafing
            double rx = gamepad1.right_stick_x * speed;

            // Read inverse IMU heading, as the IMU heading is CW positive
            double botHeading = -imu.getAngularOrientation().firstAngle;
            telemetry.addData("botHeading", botHeading);
            double rotX = x * Math.cos(botHeading) - y * Math.sin(botHeading);
            double rotY = x * Math.sin(botHeading) + y * Math.cos(botHeading);

            // Denominator is the largest motor power (absolute value) or 1
            // This ensures all the powers maintain the same ratio, but only when
            // at least one is out of the range [-1, 1]
            double denominator = Math.max(Math.abs(y) + Math.abs(x) + Math.abs(rx), 1);
            double frontLeftPower = (rotY + rotX + rx) / denominator;
            double backLeftPower = (rotY - rotX + rx) / denominator;
            double frontRightPower = (rotY - rotX - rx) / denominator;
            double backRightPower = (rotY + rotX - rx) / denominator;

            motorFrontLeft.setPower(frontLeftPower);
            motorBackLeft.setPower(backLeftPower);
            motorFrontRight.setPower(frontRightPower);
            motorBackRight.setPower(backRightPower);
            if (gamepad1.a) 
            {
                ExpansionHub2_ServoController.pwmEnable();
                telemetry.addData("Servo set to 0.5", 123);
                ClawMotor.setPosition(0.78);
            } 
            else 
            {
                ClawMotor.setPosition(0.5);
            }
            telemetry.update();
        }
    }
}
