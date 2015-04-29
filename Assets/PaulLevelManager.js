#pragma strict

public var dialogueStyle:GUIStyle;
public var buttonStyle:GUIStyle;
public var player:GameObject;
public var levelEndX:int;
private var dialogVisible:boolean;
private var levelEndDialog:boolean = false;
private var diedDialog:boolean = false;
private var pauseDialog:boolean = false;
private var appropriateToShowWarning:boolean = true;
private var dialogString:String;
private var dialogButtonString:String;

function Start () {
	dialogString = "The Regulars are coming!  Warn John Hancock,\nSamuel Adams, and the rest of the town about the\n" +
					"army's advance.  You also have a zombie problem.  Kill\nthe zombies and go to each house to warn the" +
					"\ntownspeople about the British.";
	dialogButtonString = "Start!";
	ShowDialog();
}

function Update () {
	if (levelEndX - player.transform.position.x > 3) {
		appropriateToShowWarning = true;
	}

	if (levelEndX - player.transform.position.x < 0.1 && !levelEndDialog) {
	    ShowLevelEndDialog();
	}
	
	if (Input.GetKey(KeyCode.P) && !dialogVisible) {
		ShowPauseDialog();
	}
}

function OnGUI () {
	if (dialogVisible) {
		 GUI.Label (Rect (0, 0, Screen.width, Screen.height), dialogString, dialogueStyle);
		 if (GUI.Button (Rect (Screen.width - (Screen.width / 3.75), Screen.height - (Screen.height / 4), 120, 75), dialogButtonString, buttonStyle)) {
		 	if (levelEndDialog || diedDialog) {
		 		EndLevel();
		 	} else {
		 		HideDialog();
		 	}
		 }
	}
}

function ShowDialog () {
	Pause();
	dialogVisible = true;
}

function HideDialog () {
	Resume();
	dialogVisible = false;
	levelEndDialog = false;
	diedDialog = false;
	pauseDialog = false;
}

function ShowLevelEndDialog () {
	var zombies:GameObject[] = GameObject.FindGameObjectsWithTag("Zombie");
	var requiredPoints:GameObject[]  = GameObject.FindGameObjectsWithTag("RequiredPoint");
	
	if (requiredPoints.Length > 0) {
		if (appropriateToShowWarning) {
			Pause();
			appropriateToShowWarning = false;
			dialogString = "Don't forget to warn all of the townspeople!";
			dialogButtonString = "Continue";
			dialogVisible = true;
		}
		return;
	}
	
	if (zombies.Length > 0) {
		if (appropriateToShowWarning) {
			Pause();
			appropriateToShowWarning = false;
			dialogString = "Don't forget to kill all of the zombies!";
			dialogButtonString = "Continue";
			dialogVisible = true;
		}
		return;
	}

	Pause();
	
	levelEndDialog = true;
	
	dialogString = "Congrats! You have successfully warned\neveryone about the British.  John Hancock" +
					"\nand Samuel Adams are able to escape, and\nthey help lead the colonists to a\n" +
					"Revolutionary War victory!";
	dialogButtonString = "Continue";
	
	dialogVisible = true;
}

function ShowDiedDialog () {
	Pause();
	diedDialog = true;
	dialogString = "You died!  John Hancock and Samuel Adams\nare not warned about the British, and they\nare arrested. " +
					"Without the leadership of these\ntwo forefathers, the colonists go on to\n lose the Revolutionary War, "+
					"and America never\nbecomes a country.";
	dialogButtonString = "Continue";
	dialogVisible = true;
}

function ShowPauseDialog() {
	Pause();
	pauseDialog = true;
	dialogString = "Game Paused";
	dialogButtonString = "Continue";
	dialogVisible = true;
}

function Pause () {
	var pausableObjects:GameObject[] = GetPausableObjects();
	
	for (var obj in pausableObjects) {
		obj.SendMessage("PauseGame");
	}
}

function Resume() {
	var pausableObjects:GameObject[] = GetPausableObjects();
	for (var obj in pausableObjects) {
		obj.SendMessage("ResumeGame");
	}
}

function EndLevel() {
	HideDialog();
	Application.LoadLevel(0);
}

function GetPausableObjects() {
	var canMoveObjects = new Array(GameObject.FindGameObjectsWithTag("CanMove"));
	var zombies = new Array(GameObject.FindGameObjectsWithTag("Zombie"));
	var pausableObjects:GameObject[] = canMoveObjects.Concat(zombies).ToBuiltin(GameObject);
	pausableObjects += [player];
	
	return pausableObjects;
}
