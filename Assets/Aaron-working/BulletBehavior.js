
function Update () {
	if(!renderer.isVisible) {
		Destroy(gameObject);
	}
}