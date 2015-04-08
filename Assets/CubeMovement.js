#pragma strict

var movementSpeed : int = 10;
var mainCamera : GameObject;
var cameraEdge : int = 10;
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
	    	
	    	if (transform.position.x > levelLeftEdge + cameraEdge && transform.position.x < levelRightEdge - cameraEdge) {
	    		mainCamera.transform.position.x = transform.position.x;
	    	}
	    }
	    
	    if (Input.GetKey(KeyCode.D) && transform.position.x < levelRightEdge) {
	    	transform.Translate(Vector3(1,0,0) * Time.deltaTime*movementSpeed);
	    	
	    	if (transform.position.x < levelRightEdge - cameraEdge && transform.position.x > levelLeftEdge + cameraEdge) {
	    		mainCamera.transform.position.x = transform.position.x;
	    	}
	    }
	    
	    
	    if(Input.GetMouseButtonDown(1) && !Input.GetMouseButtonDown(0)) {
	    	var bulletRight : GameObject = Instantiate(projectile, bulletSpawnRight.position, bulletSpawnRight.rotation);
	    	bulletRight.rigidbody.AddForce(transform.right * travelSpeed);
	    	bulletRight.rigidbody.useGravity = false;
	    }
	    
	    if(Input.GetMouseButtonDown(0)&& !Input.GetMouseButtonDown(1)) {
	    	var bulletLeft : GameObject = Instantiate(projectile, bulletSpawnLeft.position, bulletSpawnLeft.rotation);
	    	bulletLeft.rigidbody.AddForce(transform.right * -travelSpeed);
	    	bulletLeft.rigidbody.useGravity = false;
	    }
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
