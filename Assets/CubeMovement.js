#pragma strict

var movementSpeed : int = 10;
var mainCamera : GameObject;
var cameraLeftEdge : int = 10;
var cameraRightEdge : int = 10;
var levelTopEdge : int = 6;
var levelBottomEdge : int = -8;
var levelLeftEdge : int = -10;
var levelRightEdge : int = 10;
var levelManager : GameObject;
var health = 10;

private static var gamePaused : boolean = false;

var projectile : GameObject;
var travelSpeed : int = 1000;
var bulletSpawnRight : Transform;
var bulletSpawnLeft : Transform;
var gunshot : AudioClip;

var frontTexture : Texture;
var backTexture : Texture;

function Update () {
	if (!gamePaused) {

		if (Input.GetKey(KeyCode.W) && transform.position.z < levelTopEdge) {
			transform.Translate(Vector3(0,0,1) * Time.deltaTime*movementSpeed);
		}
		
	    if (Input.GetKey(KeyCode.S) && transform.position.z > levelBottomEdge) {
	    	transform.Translate(Vector3(0,0,-1) * Time.deltaTime*movementSpeed);
	    }
	    
	    if (Input.GetKey(KeyCode.A) && transform.position.x > levelLeftEdge) {
	    	transform.Translate(Vector3(-1,0,0) * Time.deltaTime*movementSpeed);
	    	
	    	if (transform.position.x > levelLeftEdge + cameraLeftEdge && transform.position.x < levelRightEdge - cameraRightEdge) {
	    		mainCamera.transform.position.x = transform.position.x;
	    	}
	    }
	    
	    if (Input.GetKey(KeyCode.D) && transform.position.x < levelRightEdge) {
	    	transform.Translate(Vector3(1,0,0) * Time.deltaTime*movementSpeed);
	    	
	    	if (transform.position.x < levelRightEdge - cameraRightEdge && transform.position.x > levelLeftEdge + cameraLeftEdge) {
	    		mainCamera.transform.position.x = transform.position.x;
	    	}
	    }
	    
	    
	    if(Input.GetMouseButtonDown(1) && !Input.GetMouseButtonDown(0)) {
	    	audio.clip = gunshot;
	    	audio.Play();
	    	var bulletRight : GameObject = Instantiate(projectile, bulletSpawnRight.position, bulletSpawnRight.rotation);
	    	bulletRight.rigidbody.AddForce(transform.right * travelSpeed);
	    	bulletRight.rigidbody.useGravity = false;
	    }
	    
	    if(Input.GetMouseButtonDown(0)&& !Input.GetMouseButtonDown(1)) {
	    	audio.clip = gunshot;
	    	audio.Play();
	    	var bulletLeft : GameObject = Instantiate(projectile, bulletSpawnLeft.position, bulletSpawnLeft.rotation);
	    	bulletLeft.rigidbody.AddForce(transform.right * -travelSpeed);
	    	bulletLeft.rigidbody.useGravity = false;
	    }
    }
} 

function OnGUI() {
	GUI.skin.box.normal.background = backTexture;
	GUI.Box(Rect(18, 8, 104, 24), "");
	
	if(health > 0) {
		GUI.skin.box.normal.background = frontTexture;
		GUI.Box(Rect(20, 10, health*10, 20), "HP");
		
		}
}

public function PauseGame() {
	gamePaused = true;
}

public function ResumeGame() {
	gamePaused = false;
}

public function ApplyDamage(damage : int) {
	health -= damage;
	if (health <= 0) {
		levelManager.BroadcastMessage("ShowDiedDialog");
	}
}
