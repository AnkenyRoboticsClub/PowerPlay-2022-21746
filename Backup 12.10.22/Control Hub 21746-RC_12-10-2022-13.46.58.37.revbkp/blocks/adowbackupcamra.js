// IDENTIFIERS_USED=_0AsDcMotor,_1AsDcMotor,_2AsDcMotor,_3AsDcMotor

var i, recognition, isPanelDetected, isLightbulbDetected, isBoltDetected, recognitions, index;

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
          displayInfo('Hi Natalie');
          index = index + 1;
        }
      }
      telemetry.update();
    }
  }
  tfodAccess.deactivate();
}

/**
 * Display info (using telemetry) for a recognized object.
 */
function displayInfo(i) {
  // Display the label and index number for the recognition.
  telemetryAddTextData('label ' + String(i), startBlockExecution("Recognition.Label") ? endBlockExecution(recognition.Label) : 0);
  // Display the location of the top left corner
  // of the detection boundary for the recognition
  telemetryAddTextData('Left, Top ' + String(i), String(miscAccess.roundDecimal(startBlockExecution("Recognition.Left") ? endBlockExecution(recognition.Left) : 0, 0)) + String(', ' + String(miscAccess.roundDecimal(startBlockExecution("Recognition.Top") ? endBlockExecution(recognition.Top) : 0, 0))));
  // Display the location of the bottom right corner
  // of the detection boundary for the recognition
  telemetryAddTextData('Right, Bottom' + String(i), String(miscAccess.roundDecimal(startBlockExecution("Recognition.Right") ? endBlockExecution(recognition.Right) : 0, 0)) + String(', ' + String(miscAccess.roundDecimal(startBlockExecution("Recognition.Bottom") ? endBlockExecution(recognition.Bottom) : 0, 0))));
  if ((startBlockExecution("Recognition.Label") ? endBlockExecution(recognition.Label) : 0) == '3 Panel') {
    isPanelDetected = true;
    // Display the location of the bottom right corner
    // of the detection boundary for the recognition
    telemetryAddTextData('Object Detected', '3 Panel');
    _1AsDcMotor.setDirection("REVERSE");
    _3AsDcMotor.setDirection("REVERSE");
    _0AsDcMotor.setDualPower(0.25, _1AsDcMotor, 0.25);
    _2AsDcMotor.setDualPower(0.25, _3AsDcMotor, 0.25);
    linearOpMode.sleep(1000);
    _0AsDcMotor.setDualPower(0, _1AsDcMotor, 0);
    _2AsDcMotor.setDualPower(0, _3AsDcMotor, 0);
    linearOpMode.sleep(1000);
    _0AsDcMotor.setDirection("FORWARD");
    _1AsDcMotor.setDirection("FORWARD");
    _0AsDcMotor.setDualPower(0.25, _1AsDcMotor, 0.25);
    _2AsDcMotor.setDualPower(0.25, _3AsDcMotor, 0.25);
    linearOpMode.sleep(1000);
    _0AsDcMotor.setDualPower(0, _1AsDcMotor, 0);
    _2AsDcMotor.setDualPower(0, _3AsDcMotor, 0);
  } else {
    isPanelDetected = false;
  }
  if ((startBlockExecution("Recognition.Label") ? endBlockExecution(recognition.Label) : 0) == '2 Bulb') {
    isLightbulbDetected = true;
    // Display the location of the bottom right corner
    // of the detection boundary for the recognition
    telemetryAddTextData('Object Detected', '2 Bulb');
    _0AsDcMotor.setDirection("REVERSE");
    _1AsDcMotor.setDirection("REVERSE");
    _0AsDcMotor.setDualPower(0.5, _1AsDcMotor, 0.5);
    _2AsDcMotor.setDualPower(0.5, _3AsDcMotor, 0.5);
    linearOpMode.sleep(500);
    _0AsDcMotor.setDualPower(0, _1AsDcMotor, 0);
    _2AsDcMotor.setDualPower(0, _3AsDcMotor, 0);
  } else {
    isLightbulbDetected = false;
  }
  if ((startBlockExecution("Recognition.Label") ? endBlockExecution(recognition.Label) : 0) == '1Bolt') {
    isBoltDetected = true;
    // Display the location of the bottom right corner
    // of the detection boundary for the recognition
    telemetryAddTextData('Object Detected', '1 Bolt');
    _0AsDcMotor.setDirection("REVERSE");
    _2AsDcMotor.setDirection("REVERSE");
    _0AsDcMotor.setDualPower(0.25, _1AsDcMotor, 0.25);
    _2AsDcMotor.setDualPower(0.25, _3AsDcMotor, 0.25);
    linearOpMode.sleep(1000);
    _0AsDcMotor.setDualPower(0, _1AsDcMotor, 0);
    _2AsDcMotor.setDualPower(0, _3AsDcMotor, 0);
    linearOpMode.sleep(1000);
    _0AsDcMotor.setDirection("REVERSE");
    _1AsDcMotor.setDirection("REVERSE");
    _0AsDcMotor.setDualPower(0.25, _1AsDcMotor, 0.25);
    _0AsDcMotor.setDualPower(0.25, _1AsDcMotor, 0.25);
    linearOpMode.sleep(1000);
    _0AsDcMotor.setDualPower(0, _1AsDcMotor, 0);
    _0AsDcMotor.setDualPower(0, _1AsDcMotor, 0);
  } else {
    isBoltDetected = false;
  }
}
