import './main.css';

const VER = 1.0;
const EVENT = {
  INIT: 'init'
}

var main = function(){
  var _this = this;
  var __loadingText = null;//百分比
  var __entity = null;//主体
  _this.init = function(){
    __entity = document.createElement("div");//基本component
    __entity.classList.add("loading");
    __loadingText = getText();
    __entity.appendChild(__loadingText);
  };
  /**
   * 获取实体
   */
  _this.getEntity = function(){
    return __entity;
  };
  /**
   * 获取百分比文字
   */
  function getText(){
    let div = document.createElement('div');
    div.className = "loading_text";
    return div;
  }
  /**
   * 设置百分比
   * @param	float 小数[0,1]
   */
  _this.setPercent = function(num){
    let per = Math.floor(num * 10000) /100;
    __loadingText.innerHTML = `${per}%`;
  }
  _this.init();
};


export {main, VER, EVENT}