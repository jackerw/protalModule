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
   
   //如果有配置自动开关，则自动调用
    var $checkAll=$(document).find("[data-toggle='checkAll']");
    if($checkAll.length!=0){
        $checkAll.Checkset();
    }
})(window.jQuery);

/*
 * 模拟下拉选择
 * */
 (function($){
    function Nselect(element){
        this.element=element;
        this.svalue=element.find("span");
    }
    Nselect.prototype.handle=function(){
        var that=this;
        this.element.on("click","li",function(){
            that.svalue.text($(this).text())
            that.svalue.attr('data-value',$(this).attr('data-value'));
            $(this).parent().hide()
            $(this).addClass("selectActive").siblings().removeClass("selectActive")
        })
        this.element.hover(function(){
            $(this).find("ul").show();
        },function(){
            $(this).find("ul").hide();
        })
    }

    /*插件定义*/
    function Plugin() {
        return this.each(function () {
            var $this=$(this);
            var data=$this.data('select');
            if(!data){
                $this.data('select', (data=new Nselect($this)))
            }
            data.handle();
        })
    }

    /*调用*/
    $.fn.Nselect= Plugin;
   
    //如果有配置自动开关，则自动调用
    var $sim=$(document).find("[data-toggle='nSelect']");

    if($sim!=0){
        $sim.Nselect();
    }
    
    

})(window.jQuery);


/*
 * 常用验证脚本
 * */
(function($){
    function Nvalidate(element,options){
        this.element    = element;
        this.options    = $.extend({},Nvalidate.default,options)
        this.targetList = this.element.find("input,textarea");
        this.sure       = this.element.find(".mmySure");
    }
    Nvalidate.default={
        nullTips:"不能为空",
        mobileTips:"电话号码格式错误",
        emailTips:"邮箱格式错误",
        successCallback:function(){}
    }
    //主处理
    Nvalidate.prototype.handle=function(){
        var that=this;
        this.sure.click(function(){
            that.verify(that.targetList)
        })
    }
    //校验方法
    Nvalidate.prototype.verify=function(obj){
        var that=this,
            title;
        that.targetLength=[];
        that.i=0;
        $.each(obj,function(k,v){
            var targetTitle=$(this).data('title');
            var name=$(this).attr('class');
            (targetTitle==undefined) ? title=" ": title=targetTitle;
            //非空验证
            if(name.indexOf('mmyRequire')>0){
                that.targetLength.push('true');
                if($(this).val()==""){
                    alert(title+that.options.nullTips);
                    return false;
                }else{
                    return that.ruleCheck($(this));
                }
            }else{
                 return that.ruleCheck($(this));
            }
            
        })
        //验证成功回调
        if(that.i==that.targetLength.length){
            this.options.successCallback();
        }
        
    }
    //验证规则
    Nvalidate.prototype.ruleCheck=function(targetObj){
        var that=this;
        var isNext=true;
        var className=targetObj.attr('class');
        var val=targetObj.val();
        var ruleList={
            regularmobile:/(^((\+?86)|(\(\+86\)))?\d{3,4}-{1}\d{7,8}(-{0,1}\d{3,4})?$)|(^((\+?86)|(\(\+86\)))?1\d{10}$)/,
            regularEmail : /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
        }
        if(className.indexOf('mmyMobile')> 0){
            ruleSet(ruleList.regularmobile,val,that.options.mobileTips)
        }
        else if(className.indexOf('mmyEmail')> 0){
            ruleSet(ruleList.regularEmail,val,that.options.emailTips)
        }else{
            that.i++;
        }
        if(className.indexOf('mmyRequire')<0){
            that.targetLength.push('true');
        }
        return isNext;

        function ruleSet(target,val,tips){
         if(target.test(val)){
                isNext=true;
                that.i++;
            }else{
                alert(tips);
                isNext=false;
            }
        }
       
    }

    /*插件定义*/
    function Plugin(options) {
        return this.each(function () {
            var $this=$(this);
            var data=$this.data('validate');
            if(!data){
                $this.data('validate', (data=new Nvalidate($this,options)))
            }
            data.handle();
        })
    }

    /*调用*/
    $.fn.Nvalidate= Plugin;
    //如果有配置自动开关，则自动调用
    var $Nvalidate=$(document).find("[data-toggle='Nvalidate']");

    if($Nvalidate.length!=0){
        $Nvalidate.Nvalidate()
    }
    $(".faultAdd").Nvalidate({
        successCallback:function(){
            alert("验证通过1");
        }
    });

})(window.jQuery);

});

