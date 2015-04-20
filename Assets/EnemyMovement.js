public var easyZombie : boolean = true;
public var mediumZombie : boolean = false;
public var hardZombie : boolean = false;
public var target : GameObject;
private var speed : float = 2;
private var damage : int = 2;
private var step; 
private var distance : float;
private var originalY:float;
private var attackTime:int = 0;
private var layerMask = 1 << 9;
private var canMove:boolean = true;
private var health : int = 2;

function OnTriggerEnter(col : Collider) {
	if(col.gameObject.tag == "Bullet") {
		if(health == 0) { //DEATH
			Destroy(gameObject);
			Destroy(col.gameObject);
		} else { //Bullet Hit
			health = health - 1;
			Destroy(col.gameObject);
		}
	}
}

function Start () {

	if (easyZombie) {
		speed = 1;
		damage = 1;
		health = 1;
	} else if (mediumZombie) {
		speed = 2;
		damage = 2;
		health = 2;
	} else {
		speed = 3;
		damage = 3;
		health = 3;
	}

	originalY = transform.position.y;
	step = speed * Time.deltaTime;
	distance = Vector3.Distance(transform.position, target.transform.position);
}

function Update() {
	if (health >= 0 && canMove) {
		Move();
	}
}

function Move() {
	distance = Vector3.Distance(transform.position, target.transform.position);

	transform.position.y = originalY;
    
    //enemy sees you - perform some action
	if(distance > 2 && distance < 13) {
		var targetPostition: Vector3 = new Vector3( target.transform.position.x, 
                                   transform.position.y, 
                                   target.transform.position.z ) ;
	
		transform.LookAt(targetPostition);
		
		var hit:RaycastHit;
		
		var fwd = transform.TransformDirection (Vector3.forward);
		if (Physics.Raycast (transform.position, fwd, hit,  1000, layerMask)) {
			print ("hit something");
			if(hit.collider.gameObject == target)
			{
					transform.position = Vector3.MoveTowards(transform.position, target.transform.position, step);
					print("hit target");

			}
		}
	} else if (distance <= 2) {
		if (Time.time - attackTime >= 1) {
			attackTime = Time.time;
			AttackPlayer();
		}
	}
}

function AttackPlayer() {
	print("attacking player");
	target.BroadcastMessage("ApplyDamage", damage);
}

function PauseGame() {
	canMove = false;
}

function ResumeGame() {
	canMove = true;
}