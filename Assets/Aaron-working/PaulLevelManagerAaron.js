#pragma strict

public var dialogueStyle:GUIStyle;
public var buttonStyle:GUIStyle;
public var player:GameObject;
public var levelEndX:int;
private var dialogVisible:boolean;
private var levelEndDialog:boolean = false;
private var diedDialog:boolean = false;
private var dialogString:String;
private var dialogButtonString:String;

function Start () {
	dialogString = "The Regulars are coming!  Warn John Hancock, Samuel Adams, and the rest of the town about the " +
					"army's advance.  You also have a zombie problem.  Kill the zombies and go to each house to warn about the British.";
	dialogButtonString = "Got it!";
	ShowDialog();
}

function Update () {
	if (levelEndX - player.transform.position.x < 0.1 && !levelEndDialog) {
	    ShowLevelEndDialog();
	}
}

function OnGUI () {
	if (dialogVisible) {
		 GUI.Label (Rect (0, 0, Screen.width, Screen.height), dialogString, dialogueStyle);
		 if (GUI.Button (Rect (Screen.width - (Screen.width / 4), Screen.height - (Screen.height / 4), 100, 75), dialogButtonString, buttonStyle)) {
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
}

function ShowLevelEndDialog () {
	var zombies:GameObject[] = GameObject.FindGameObjectsWithTag("Zombie");
	var requiredPoints:GameObject[]  = GameObject.FindGameObjectsWithTag("RequiredPoint");
	
	if (zombies.Length > 0 || requiredPoints.Length > 0) {
		return;
	}

	Pause();
	
	levelEndDialog = true;
	
	dialogString = "Congrats! You have successfully warned everyone about the British.  John Hancock " +
					"and Samuel Adams are able to get away and they help lead the colonists to a " +
					"Revolutionary War victory.";
	dialogButtonString = "Continue";
	
	dialogVisible = true;
}

function ShowDiedDialog () {
	Pause();
	diedDialog = true;
	dialogString = "You died!  John Hancock and Samuel Adams are not warned about the British and are arrested. " +
					"Without the leadership of these two forefathers the colonists go on to lose the Revolutionary War "+
					"and America never becomes a country.";
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