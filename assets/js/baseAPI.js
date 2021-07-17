//注意，每次调用$.ajax post get请求时
// 会先调用这个函数
// 在这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    //在发起真正的ajax请求之前。同意拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net/' + options.url;

})