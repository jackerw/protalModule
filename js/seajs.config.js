seajs.config({
    alias : {
        // 第三方工具
    	'jquery': 'jquery',
        'mutually':'com_mutually.js',
        'validate':'validate.js',
        'demo':'demo.js'
    },
     preload: ["jquery"]
});