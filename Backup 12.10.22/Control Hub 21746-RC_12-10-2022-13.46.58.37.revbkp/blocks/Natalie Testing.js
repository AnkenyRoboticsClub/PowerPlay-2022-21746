// IDENTIFIERS_USED=_0AsDcMotor,_1AsDcMotor,_2AsDcMotor,_3AsDcMotor

var i, recognition, isPanelDetected, isLightbulbDetected, isBoltDetected, recognitions, index;

/**
 * This function is executed when this Op Mode is selected from the Driver Station.
 */
function runOpMode() {
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
    _2AsDcMotor.setDirection("REVERSE");
    _3AsDcMotor.setDirection("REVERSE");
    _0AsDcMotor.setDualPower(0.25, _1AsDcMotor, 0.25);
    _2AsDcMotor.setDualPower(0.25, _3AsDcMotor, 0.25);
    linearOpMode.sleep(1000);
    _0AsDcMotor.setDualPower(0, _1AsDcMotor, 0);
    _2AsDcMotor.setDualPower(0, _3AsDcMotor, 0);
    linearOpMode.sleep(1000);
    _2AsDcMotor.setDirection("FORWARD");
    _3AsDcMotor.setDirection("FORWARD");
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
    _2AsDcMotor.setDirection("REVERSE");
    _3AsDcMotor.setDirection("REVERSE");
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
    _1AsDcMotor.setDirection("REVERSE");
    _3AsDcMotor.setDirection("REVERSE");
    _0AsDcMotor.setDualPower(0.25, _1AsDcMotor, 0.25);
    _2AsDcMotor.setDualPower(0.25, _3AsDcMotor, 0.25);
    linearOpMode.sleep(1000);
    _0AsDcMotor.setDualPower(0, _1AsDcMotor, 0);
    _2AsDcMotor.setDualPower(0, _3AsDcMotor, 0);
    linearOpMode.sleep(1000);
    _2AsDcMotor.setDirection("REVERSE");
    _3AsDcMotor.setDirection("REVERSE");
    _0AsDcMotor.setDualPower(0.25, _1AsDcMotor, 0.25);
    _0AsDcMotor.setDualPower(0.25, _1AsDcMotor, 0.25);
    linearOpMode.sleep(1000);
    _0AsDcMotor.setDualPower(0, _1AsDcMotor, 0);
    _0AsDcMotor.setDualPower(0, _1AsDcMotor, 0);
  } else {
    isBoltDetected = false;
  }
}
