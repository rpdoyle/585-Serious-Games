#pragma strict
import UnityEngine.UI;

public var levelSelectText:Text;
public var titleText:Text;
public var myPic:GameObject;
public var fadeTime:float;
private var picVisible:boolean;
private var textVisible:boolean;

function Start () {
	picVisible = false;
	textVisible = true;
}

function Update () {
	FadePic();
	FadeText();
}

function OnMouseOver () {
	picVisible = true;
	textVisible = false;
}

function OnMouseExit () {
	picVisible = false;
	textVisible = true;
}

function FadePic() {
	if (picVisible) {
		myPic.SetActive(true);
	} else {
		myPic.SetActive(false);
	}
}

function FadeText() {
	if (textVisible) {
		levelSelectText.enabled = true;
		titleText.enabled = true;
	} else {
		levelSelectText.enabled = false;
		titleText.enabled = false;
	}
}

function LoadPaulRevereLevel() {
	Application.LoadLevel(1);
}