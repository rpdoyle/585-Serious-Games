#pragma strict

var movementSpeed : int = 10;
var mainCamera : GameObject;
var cameraEdge : int = 10;
var levelTopEdge : int = 6;
var levelBottomEdge : int = -8;
var levelLeftEdge : int = -10;
var levelRightEdge : int = 10;
var levelManager : GameObject;

private static var gamePaused : boolean = false;

var projectile : GameObject;
var travelSpeed : int = 1000;
var bulletSpawnRight : Transform;
var bulletSpawnLeft : Transform;

var right : boolean = true;
var left : boolean = false;

function Update () {
	if (!gamePaused) {

		if (Input.GetKey(KeyCode.UpArrow) && transform.position.z < levelTopEdge) {
			transform.Translate(Vector3(0,0,1) * Time.deltaTime*movementSpeed);
		}
		
	    if (Input.GetKey(KeyCode.DownArrow) && transform.position.z > levelBottomEdge) {
	    	transform.Translate(Vector3(0,0,-1) * Time.deltaTime*movementSpeed);
	    }
	    
	    if (Input.GetKey(KeyCode.LeftArrow) && transform.position.x > levelLeftEdge) {
	    	transform.Translate(Vector3(-1,0,0) * Time.deltaTime*movementSpeed);
	    	
	    	if (transform.position.x > levelLeftEdge + cameraEdge && transform.position.x < levelRightEdge - cameraEdge) {
	    		mainCamera.transform.position.x = transform.position.x;
	    	}
	    	
	    	right = false;
	    	left = true;
	    }
	    
	    if (Input.GetKey(KeyCode.RightArrow) && transform.position.x < levelRightEdge) {
	    	transform.Translate(Vector3(1,0,0) * Time.deltaTime*movementSpeed);
	    	
	    	if (transform.position.x < levelRightEdge - cameraEdge && transform.position.x > levelLeftEdge + cameraEdge) {
	    		mainCamera.transform.position.x = transform.position.x;
	    	}
	    	
	    	left = false;
	    	right = true;
	    }
	    
	    
	    if(Input.GetMouseButtonDown(0) && right) {
	    	var bulletRight : GameObject = Instantiate(projectile, bulletSpawnRight.position, bulletSpawnRight.rotation);
	    	bulletRight.rigidbody.AddForce(transform.right * travelSpeed);
	    	bulletRight.rigidbody.useGravity = false;
	    }
	    
	    if(Input.GetMouseButtonDown(0) && left) {
	    	var bulletLeft : GameObject = Instantiate(projectile, bulletSpawnLeft.position, bulletSpawnLeft.rotation);
	    	bulletLeft.rigidbody.AddForce(transform.right * -travelSpeed);
	    	bulletLeft.rigidbody.useGravity = false;
	    }
    }
} 

public function PauseGame() {
	gamePaused = true;
}

public function ResumeGame () {
	gamePaused = false;
}