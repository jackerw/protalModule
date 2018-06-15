define(function(require, exports, module) {
    var $ = require("jquery");
    require('validate');
    require('mutually');

    $(".ssBtn").Nvalidate({
        nullTips:"不能为空",
        verifyFront:function(){
            alert('验证前先做的事')
        },
        successCallback:function(){
            alert('已经验证成功，可以做你想做的事了')
        }
    })
})