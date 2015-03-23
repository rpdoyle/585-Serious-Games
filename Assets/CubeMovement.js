#pragma strict

var movementSpeed : int = 10;
var mainCamera : GameObject;
var cameraEdge : int = 10;
var levelTopEdge : int = 6;
var levelBottomEdge : int = -8;
var levelLeftEdge : int = -10;
var levelRightEdge : int = 10;


function Update () {
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
    }
    
    if (Input.GetKey(KeyCode.RightArrow) && transform.position.x < levelRightEdge) {
    	transform.Translate(Vector3(1,0,0) * Time.deltaTime*movementSpeed);
    	
    	if (transform.position.x < levelRightEdge - cameraEdge && transform.position.x > levelLeftEdge + cameraEdge) {
    		mainCamera.transform.position.x = transform.position.x;
    	}
    }
} 