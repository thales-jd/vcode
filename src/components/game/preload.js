const VER = 1.0;

//纹理
let _textures = [];
let textureContext = require.context("./textures/", true, /^\.\/.*\.(png|jpg|gif)$/);
const texturePattern = /\/textures\-(.*)\.(png|jpg|gif)$/;
textureContext.keys().map(textureContext).forEach(src => {
  let o = {};
  let arr = src.match(texturePattern);
  let name = arr[1];
  o.id = name;
  o.src = src;
  _textures.push(o);
});

/**
 *	预先加载
 */
var _queue = null;	//loder
/**
 *	初始化
 */
var init = function(){
  _queue = new createjs.LoadQueue(false);
  _queue.loadManifest(_textures, false);
};
/**
 *	加载
 */
var load = function(progress, complete){
  if(!_queue) init();
  _queue.on("fileload", onFileLoad);
  if(progress)_queue.on("progress", progress, this);//资源载入中
  if(complete)_queue.on("complete", complete, this);//资源载入完毕
  _queue.load();
};
let onFileLoad = function(e){
  let item = e.item;
  let queue = e.target;
  if(item.ext == "fbx"){
    queue.setPaused(true);
    let model = new FbxModel.main(item.src);
    addModel(item.id, model);
    model.addEventListener(FbxModel.EVENT.MODEL_LOADED, function(e){
      queue.setPaused(false);
    });
  }
};
/**
 *	获取loader
*/
var getQueue = function(){
  return _queue;
};
/**
 *	获取文件实体
*/
var getResult = function(id){
  return _queue.getResult(id);
};
export {load,getResult,getModel};

