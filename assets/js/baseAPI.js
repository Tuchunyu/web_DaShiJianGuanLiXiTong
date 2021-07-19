//注意，每次调用$.ajax post get请求时
// 会先调用这个函数
// 在这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    //在发起真正的ajax请求之前。同意拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net/' + options.url;
    //统一为有权限的接口设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    };

    // 全局统一挂载complete函数
    options.complete = function(res) {
        // 使用res.resposeJSON拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 强制清空token
            localStorage.removeItem('token')
                //强制跳转登录页面
            location.href = '/login.html'
        }
    }
})