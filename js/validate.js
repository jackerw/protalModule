/*
 * 标题：验证组件
 * 描述：该脚本库为常见交互库，代码引用后，只需要在html标签配置调用属性即可。
 */
(function($){
    function Nvalidate(element,options){
        this.element    = element;
        this.options    = $.extend({},Nvalidate.default,options)
        this.targetList = this.element.parents("form").find("input,textarea");
    }
    Nvalidate.default={
        nullTips:"不能为空",
        mobileTips:"电话号码格式错误",
        emailTips:"邮箱格式错误",
        ipTips:"IP格式错误",
        verifyFront:function(){},
        successCallback:function(){}
    }
    //主处理
    Nvalidate.prototype.handle=function(){
        var that=this;
        this.element.click(function(){
            that.options.verifyFront();
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
            var name=$(this).prop('class');
            (targetTitle==undefined) ? title=" ": title=targetTitle;
            //非空验证
            if(name.indexOf('mmyRequire')>-1){
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
        var className=targetObj.prop('class');
        var val=targetObj.val();
        var ruleList={
            regularmobile:/(^((\+?86)|(\(\+86\)))?\d{3,4}-{1}\d{7,8}(-{0,1}\d{3,4})?$)|(^((\+?86)|(\(\+86\)))?1\d{10}$)/,
            regularEmail : /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
            reqularIp:/^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/
        }
        if(val!=""){
            /*表单值不为空的时候才验证格式*/
             if(className.indexOf('mmyMobile')> 0){
                ruleSet(ruleList.regularmobile,val,that.options.mobileTips)
            }
            else if(className.indexOf('mmyEmail')> 0){
                ruleSet(ruleList.regularEmail,val,that.options.emailTips)
            }
            else if(className.indexOf('mmyIp')> 0){
                ruleSet(ruleList.reqularIp,val,that.options.ipTips)
            }
            else{
                that.i++;
            }
            if(className.indexOf('mmyRequire')<0){
                that.targetLength.push('true');
            }
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

})(window.jQuery);