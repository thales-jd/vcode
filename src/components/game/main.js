import Dog from './dog';
import "three/examples/js/controls/DeviceOrientationControls";

/**
 *	版本
 */
const VER = "1.0";
/**
 *	事件
 */
const EVENT = {
  RUNNING:	"running",
  MODEL_LOADED:	"modeLoaded",
  PERSON_FAIL: "personFail",
  GAME_INIT: "gameInit",
  GAME_START:	"gameStart",
  GAME_OVER:	"gameOver"
}
/**
 *	主体
 */
var main = function(){
  var _this = this;
  
  var WIDTH = 0,
    HEIGHT = 0;
    
  var CAMERA = {
    x : 0,
    y : 0,
    z : 0,
    fov : 60,
    near : 10,
    far : 2000
  };
  var __camera = null,	//摄像头
    __scene = null,	//场景
    __renderer = null,	//渲染器
    __dog = null,	//场地
    __globe = null,	//球
    __environment = null;	//环境
  var _controls = null;	//控制器
  var _clock = new THREE.Clock();
  var __stats = null;	//fps
  /**
   *	初始化
   */
  _this.init = function(){
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    __camera = new THREE.PerspectiveCamera( CAMERA.fov, WIDTH / HEIGHT, CAMERA.near, CAMERA.far );
    __scene = new THREE.Scene();	//场景
    __renderer = new THREE.WebGLRenderer();	//渲染器
    __renderer.setPixelRatio( window.devicePixelRatio );
    __renderer.setSize( WIDTH, HEIGHT );
    //__stats = new Stats();
    //document.body.appendChild(__stats.dom);
    animate();
  };
  _this.resize = function(width, height){
    if(!width) width = window.innerWidth;
    if(!height) height = window.innerHeight;
    WIDTH = width;
    HEIGHT = height;
    __camera.aspect = WIDTH/HEIGHT;
    __camera.updateProjectionMatrix();
    __renderer.setSize( WIDTH, HEIGHT );
  };
  _this.getEntity = function(){
    return __renderer.domElement;
  };
  /**
   *	启动
   */
  _this.launch = function(){
    let texture = new THREE.Texture(Preload.getResult("dog"));
    texture.needsUpdate = true;
    let material = new THREE.MeshBasicMaterial({map:texture, wireframe:true});
    let geometry = new THREE.SphereGeometry(1000, 100, 100);
    let mesh = new THREE.Mesh(geometry, material);
    __dog = new Dog();
    let radii = 500;
    let theta = THREE.Math.degToRad(30);
    let phi = THREE.Math.degToRad(30);
    let x = radii * Math.sin(phi) * Math.cos(theta);
    let y = radii * Math.sin(phi) * Math.sin(theta);
    let z = radii * Math.cos(phi);
    __dog.position.x = x;
    __dog.position.y = y;
    __dog.position.z = z;
    console.log(__dog.position);
    __scene.add( __dog, mesh);
    _this.control();
  };
  /**
   *	控制
   */
  _this.control = function(){
    _controls = new THREE.DeviceOrientationControls( __camera );
    //_controls = new THREE.OrbitControls( __camera, __renderer.domElement );
    //__renderer.domElement.addEventListener("touchstart", onTouchStart, false);
    //__renderer.domElement.addEventListener("touchmove", onTouchMove, false);
    //__renderer.domElement.addEventListener("touchend", onTouchEnd, false);
  };
  /**
   *	动画
   */
  function animate() {
    requestAnimationFrame( animate );
    if(__stats) __stats.update();
    if(_controls) _controls.update();
    __renderer.clear();
    __renderer.render( __scene, __camera );
  }
  _this.init();
};

Object.assign( main.prototype, THREE.EventDispatcher.prototype);
main.prototype.constructor = main;

export {main,VER,EVENT};