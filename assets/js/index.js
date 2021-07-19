$(function() {
    getUserInfo(); //获取用户基本信息函数

    var layer = layui.layer;
    $('#btn_logout').on('click', function() {
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function(index) {
            console.log('111');
            // 清空本地存储中的token
            localStorage.removeItem('token');
            // 重新跳转登录页
            location.href = '/login.html';
            //关闭询问框，官方自带
            layer.close(index);
        });
    })

})

var layer = layui.layer;
//获取用户基本信息函数
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: 'my/userinfo',
        //请求头配置对象,写在baseAPI里了
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data) //渲染用户头像，欢迎文本

        },
        //不论成功还是失败，都会调用,写在baseAPI里了
        // complete: function(res) {
        //     // 使用res.resposeJSON拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 强制清空token
        //         localStorage.removeItem('token')
        //             //强制跳转登录页面
        //         location.href = '/login.html'
        //     }
        // }
    })
}

//渲染用户头像函数
function renderAvatar(user) {
    //1.获取用户名称
    var name = user.nickname || user.username;

    //2.设置欢迎文本
    $('.welcome').html('欢迎&nbsp;&nbsp' + name);
    //3.按需渲染用户头像
    if (user.user_pic !== null) {
        //3.1渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        //3.2渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}