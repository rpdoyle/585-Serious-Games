#pragma strict
import UnityEngine.UI;

public var myText:Text;
public var myPic:GameObject;
public var fadeTime:float;
private var textVisible:boolean;

function Start () {
	
}

function Update () {
	FadeText();
}

function OnMouseOver () {
	textVisible = true;
}

function OnMouseExit () {
	textVisible = false;
}

function FadeText() {
	if (textVisible) {
		myText.color = Color.Lerp (myText.color, Color.white, fadeTime * Time.deltaTime);
		myPic.SetActive(true);
	} else {
		myText.color = Color.Lerp (myText.color, Color.clear, fadeTime * Time.deltaTime);
		myPic.SetActive(false);
	}
}