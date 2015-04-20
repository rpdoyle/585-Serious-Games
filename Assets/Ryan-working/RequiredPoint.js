#pragma strict

function Start () {

}

function Update () {

}

function OnTriggerEnter (object : Collider) {
Debug.Log("triggerenter");
	Debug.Log(object.gameObject.layer);
	if(object.gameObject.tag == "Player") {
		Destroy(gameObject);
	}
}