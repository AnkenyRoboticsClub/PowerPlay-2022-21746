// IDENTIFIERS_USED=_0AsDcMotor,_1AsDcMotor,_2AsDcMotor,_3AsDcMotor

var i, isLightbulbDetected, recognition, isPanelDetected, isBoltDetected, recognitions, index;

/**
 * This function is executed when this Op Mode is selected from the Driver Station.
 */
function runOpMode() {
  vuforiaCurrentGameAccess.initialize_withWebcam_2("Webcam 1", '', false, false, "NONE", 0, 0, 0, "XZY", 90, 90, 0, true);
  tfodAccess.useDefaultModel();
  tfodAccess.initialize(vuforiaCurrentGameAccess, 0.7, true, true);
  // Activate TFOD here so the object detection labels are visible
  // in the Camera Stream preview window on the Driver Station.
  tfodAccess.activate();
  tfodAccess.setZoom(1.5, 16 / 9);
  telemetryAddTextData('DS preview on/off', '3 dots, Camera Stream');
  telemetryAddTextData('>', 'Press Play to start');
  telemetry.update();
  linearOpMode.waitForStart();
  if (linearOpMode.opModeIsActive()) {
    while (linearOpMode.opModeIsActive()) {
      // Get a list of recognitions from TFOD.
      recognitions = JSON.parse(tfodAccess.getRecognitions());
      // If list is empty, inform the user. Otherwise, go
      // through list and display info for each recognition.
      if (listLength(miscAccess, recognitions) == 0) {
        telemetryAddTextData('TFOD', 'No items detected.');
      } else {
        index = 0;
        isLightbulbDetected = false;
        isPanelDetected = false;
        isBoltDetected = false;
        // Iterate through list and call a function to
        // display info for each recognized object.
        for (var recognition_index in recognitions) {
          recognition = recognitions[recognition_index];
          displayInfo(index);
          index = index + 1;
          break;
        }
      }
      telemetry.update();
    }
  }
  tfodAccess.deactivate();
}

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
  linearOpMode.sleep(700);
  _0AsDcMotor.setDualPower(0, _1AsDcMotor, 0);
  _2AsDcMotor.setDualPower(0, _3AsDcMotor, 0);
}

/**
 * Describe this function...
 */
function go_right() {
  // Display the location of the bottom right corner
  // of the detection boundary for the recognition
  telemetryAddTextData('go', 'right');
  _2AsDcMotor.setDirection("FORWARD");
  _3AsDcMotor.setDirection("FORWARD");
  _0AsDcMotor.setDirection("REVERSE");
  _1AsDcMotor.setDirection("REVERSE");
  _0AsDcMotor.setDualPower(0.5, _1AsDcMotor, 0.5);
  _2AsDcMotor.setDualPower(0.5, _3AsDcMotor, 0.5);
  linearOpMode.sleep(1000);
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
 * Describe this function...
 */
function go_backward() {
  // Display the location of the bottom right corner
  // of the detection boundary for the recognition
  telemetryAddTextData('go', 'forward');
  _2AsDcMotor.setDirection("FORWARD");
  _3AsDcMotor.setDirection("REVERSE");
  _0AsDcMotor.setDirection("FORWARD");
  _1AsDcMotor.setDirection("REVERSE");
  _0AsDcMotor.setDualPower(-0.5, _1AsDcMotor, -0.5);
  _2AsDcMotor.setDualPower(0.5, _3AsDcMotor, 0.5);
  linearOpMode.sleep(100);
  _0AsDcMotor.setDualPower(0, _1AsDcMotor, 0);
  _2AsDcMotor.setDualPower(0, _3AsDcMotor, 0);
}

/**
 * Display info (using telemetry) for a recognized object.
 */
function displayInfo(i) {
  if ((startBlockExecution("Recognition.Label") ? endBlockExecution(recognition.Label) : 0) == '3 Panel') {
    isPanelDetected = true;
    // Display the location of the bottom right corner
    // of the detection boundary for the recognition
    telemetryAddTextData('Panel Detected', '3');
    go_forward();
    linearOpMode.sleep(500);
    go_backward();
    linearOpMode.sleep(500);
    go_right();
  } else {
    isPanelDetected = false;
  }
  if ((startBlockExecution("Recognition.Label") ? endBlockExecution(recognition.Label) : 0) == '2 Bulb') {
    isLightbulbDetected = true;
    telemetry.addNumericData('Bulb detected', 2);
    go_forward();
  } else {
    isLightbulbDetected = false;
  }
  if ((startBlockExecution("Recognition.Label") ? endBlockExecution(recognition.Label) : 0) == '1 Bolt') {
    isBoltDetected = true;
    telemetry.addNumericData('Bolt detected', 1);
    go_forward();
    linearOpMode.sleep(500);
    go_forward();
    linearOpMode.sleep(500);
    go_left();
  } else {
    isBoltDetected = false;
  }
}
