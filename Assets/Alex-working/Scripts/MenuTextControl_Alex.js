#pragma strict
import UnityEngine.UI;

public var levelSelectText:Text;
public var titleText:Text;
public var myPic:GameObject;
public var fadeTime:float;

function Start () {
	myPic.SetActive(false);
}

function Update () {

}

function OnMouseOver () {
	myPic.SetActive(true);
	levelSelectText.enabled = false;
	titleText.enabled = false;
}

function OnMouseExit () {
	myPic.SetActive(false);
	levelSelectText.enabled = true;
	titleText.enabled = true;
}

function LoadMainMenu() {
	Application.LoadLevel(0);
}

function LoadPaulRevereLevel() {
	Application.LoadLevel(1);
}

function LoadMoonLevel() {
	Application.LoadLevel(2);
}

function LoadInstructions() {
	Application.LoadLevel(3);
}

function LoadCredits() {
	Application.LoadLevel(4);
}