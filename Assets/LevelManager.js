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
	dialogString = "This is where awesome text explaining the level will be displayed.\n\nYou can use multiple lines if you like. Or not, that's cool too." + 
						"\nPress any button to do nothing.\n\nNo, seriously, nothing.\n\nYep, absolutely nothing.";
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
	
	if (zombies.Length > 0) {
		return;
	}

	Pause();
	
	levelEndDialog = true;
	
	dialogString = "Congrats! You made it to the end!";
	dialogButtonString = "Continue";
	
	dialogVisible = true;
}

function ShowDiedDialog () {
	Pause();
	diedDialog = true;
	dialogString = "You died!";
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
	
	return pausableObjects;
}