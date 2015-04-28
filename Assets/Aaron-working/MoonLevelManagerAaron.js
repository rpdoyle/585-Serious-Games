#pragma strict

public var dialogueStyle:GUIStyle;
public var buttonStyle:GUIStyle;
public var player:GameObject;
public var flag:GameObject;
public var levelEndX:int;
public var levelBeginX:int;
private var dialogVisible:boolean;
private var levelEndDialog:boolean = false;
private var flagPlaced:boolean = false;
private var diedDialog:boolean = false;
private var dialogString:String;
private var dialogButtonString:String;

function Start () {
	dialogString = "Congratulations!  You have made it to the moon... uh oh!  It looks like you have some company.\n" +
					"Make your way past the zombies to plant the American flag and then come back to the lunar lander.";
	dialogButtonString = "Got it!";
	ShowDialog();
	flag.SetActive(false);
}

function Update () {
	if (levelEndX - player.transform.position.x < 0.1 && !flagPlaced) {
	    PlaceFlag();
   	    ReleaseSecondWave();
	}
	if (player.transform.position.x - levelBeginX < 0.1 && !levelEndDialog && flagPlaced) {
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
	var zombies1 = new Array(GameObject.FindGameObjectsWithTag("Zombie"));
	var zombies2 = new Array(GameObject.FindGameObjectsWithTag("Zombie2"));
	var zombies : GameObject[] = zombies1.Concat(zombies2).ToBuiltin(GameObject);	
	
	if (zombies.Length > 0) {
		return;
	}

	Pause();
	
	levelEndDialog = true;
	
	dialogString = "You made it back!  Because of this accomplishment Americans have gained morale "+
					"in the Cold War and the United States wins the space race.";
	dialogButtonString = "Continue";
	
	dialogVisible = true;
}

function PlaceFlag() {
	flag.SetActive(true);
	flagPlaced = true;
}

function ReleaseSecondWave() {
	var zombies2 = new Array(GameObject.FindGameObjectsWithTag("Zombie2"));
	for (var zombie : GameObject in zombies2) {
		zombie.transform.position.y += 12;
	}
}

function ShowDiedDialog () {
	Pause();
	diedDialog = true;
	dialogString = "You died!  Because of this, Neil Armstrong and Buzz Aldrin do not make it home. " +
					"America goes on to lose the space race and eventually lose the Cold War.";
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
	var zombies2 = new Array(GameObject.FindGameObjectsWithTag("Zombie2"));
	zombies = zombies.Concat(canMoveObjects);
	var pausableObjects:GameObject[] = zombies2.Concat(zombies).ToBuiltin(GameObject);
	pausableObjects += [player];
	
	return pausableObjects;
}
