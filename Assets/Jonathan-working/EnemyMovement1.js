var health : int = 2;

function OnTriggerEnter(col : Collider) {
	if(col.gameObject.tag == "Bullet") {
		if(health == 0) {
			Destroy(gameObject);
			Destroy(col.gameObject);
		}
		else {
			health = health - 1;
			Destroy(col.gameObject);
		}
	}
}