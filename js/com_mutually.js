/*
 * 标题：公共交互
 * 描述：该脚本库为常见交互库，代码引用后，只需要在html标签配置调用属性即可。
 */

define(function(require, exports, module) {
	var $ = require("jquery");
/*
 * 功能：全选，全选条件交互
 * */
(function($){
    function Checkset(element){
        this.element=element;
        this.$allCheck=this.element.find("[name='checkAll']");
        this.$clistBg=this.$allCheck.parents("[data-toggle='checkAll']");
        this.checkFlag=0;
    }

    Checkset.prototype.handle=function(){//主方法
       var that=this;
	   this.$clistBg.on('click',"input[name!='checkAll']",function(){
		   var isAll = false,
    	   	  isCheck=$(this).prop('checked'),
    		  listLen=that.$clistBg.find("input[name!='checkAll']").length;
		   
		   if(isCheck)
			   that.checkFlag++;
			else
			   that.checkFlag--;
		   
		   if(listLen==that.checkFlag){
			   isAll=true;
		   }
    	   that.$allCheck.prop("checked",isAll);
	   })
    	//全选
       this.$allCheck.click(function(){
    	   that.$checkList=that.$clistBg.find("input[name!='checkAll']");
    	   var listLen=that.$clistBg.find("input[name!='checkAll']").length;
    	   if($(this).prop("checked")){
				that.$checkList.each(function(){
					$(this).prop("checked",true);
				})
				that.checkFlag=listLen;
			}else{
				that.$checkList.each(function(){
					$(this).prop("checked",false);
				})
				that.checkFlag=0;
			}
       })
    };
    
    /*插件定义*/
    function Plugin() {
        return this.each(function () {
            var $this=$(this);
            var data=$this.data('check');
            if(!data){
                $this.data('check', (data=new Checkset($this)))
            }
            data.handle();
        })
    }

    /*调用*/
    $.fn.Checkset= Plugin;
   
    //HTML配置调用
    var $checkAll=$(document).find("[data-toggle='checkAll']");
    $checkAll.Checkset();
    
})(window.jQuery || window.Zepto);


/*
 * 无刷新切换页面
 * */
(function($){
    function switchTab(element){
        this.element=element;
    }
    switchTab.prototype.handle=function(){

    }

    /*插件定义*/
    function Plugin() {
        return this.each(function () {
            var $this=$(this);
            var data=$this.data('check');
            if(!data){
                $this.data('check', (data=new Checkset($this)))
            }
            data.handle();
        })
    }

    /*调用*/
    $.fn.switchTab= Plugin;
   
    //HTML配置调用
    var $switch=$(document).find("[data-toggle='switchTab']");
    
    $switch.switchTab();

})(window.jQuery || window.Zepto);

});
