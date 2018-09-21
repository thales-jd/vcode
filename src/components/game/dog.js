/**
 *	场地
 */
var Dog = function(){
	var _this = this;
	var __entity = null;
	_this.init = function(){
		THREE.Object3D.call(_this);
		let image = Preload.getResult('dog2');
		let t = new THREE.Texture(image);
		t.needsUpdate = true;
		let m = new THREE.SpriteMaterial( { map: t, transparent: true } );
		__entity = new THREE.Sprite( m );
	
		__entity.scale.x = image.width/10;
		__entity.scale.y = image.height/10;
		_this.add(__entity);
	};
	_this.init();
};
Dog.prototype = Object.create( THREE.Object3D.prototype );
Dog.prototype.constructor = Dog;

export default Dog;