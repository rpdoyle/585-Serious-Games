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
private var pauseDialog:boolean = false;
private var appropriateToShowWarning:boolean = true;
private var dialogString:String;
private var dialogButtonString:String;
private var secondWaveZombies:Array;

function Start () {
	secondWaveZombies = new Array(GameObject.FindGameObjectsWithTag("Zombie2"));
	for (var zombie : GameObject in secondWaveZombies) {
		zombie.SetActive(false);
	}
	
	dialogString = "Congratulations!  You have made it to the Moon.\nUh oh!  It looks like you have some company…\n" +
					"Make your way past the zombies to plant the American flag on the\nfar side of the Moon, and " +
					"then come back to the lunar lander.";
	dialogButtonString = "Start!";
	ShowDialog();
	flag.SetActive(false);
}

function Update () {
	if (player.transform.position.x - levelBeginX > 3) {
		appropriateToShowWarning = true;
	}

	if (levelEndX - player.transform.position.x < 0.1 && !flagPlaced) {
	    PlaceFlag();
   	    ReleaseSecondWave();
	}
	if (player.transform.position.x - levelBeginX < 0.1 && !levelEndDialog) {
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
	var zombies1 = new Array(GameObject.FindGameObjectsWithTag("Zombie"));
	var zombies2 = new Array(GameObject.FindGameObjectsWithTag("Zombie2"));
	var zombies : GameObject[] = zombies1.Concat(zombies2).ToBuiltin(GameObject);	
	
	if (!flagPlaced) {
		if (appropriateToShowWarning) {
			Pause();
			appropriateToShowWarning = false;
			dialogString = "Don't forget to place the American flag!";
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
	
	dialogString = "You made it back!  Because of your accomplishment,\nAmericans have gained morale "+
					"during the Cold War, and\nthe United States wins the Space Race!";
	dialogButtonString = "Continue";
	
	dialogVisible = true;
}

function PlaceFlag() {
	flag.SetActive(true);
	flagPlaced = true;
}

function ReleaseSecondWave() {
	for (var zombie : GameObject in secondWaveZombies) {
		zombie.SetActive(true);
		zombie.transform.position.y += 12;
	}
}

function ShowDiedDialog () {
	Pause();
	diedDialog = true;
	dialogString = "You died!  Because of this, Neil Armstrong and Buzz Aldrin\ndo not make it home. " +
					"America goes on to lose the Space Race\nand eventually the Cold War.";
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
	var zombies2 = new Array(GameObject.FindGameObjectsWithTag("Zombie2"));
	zombies = zombies.Concat(canMoveObjects);
	var pausableObjects:GameObject[] = zombies2.Concat(zombies).ToBuiltin(GameObject);
	pausableObjects += [player];
	
	return pausableObjects;
}
