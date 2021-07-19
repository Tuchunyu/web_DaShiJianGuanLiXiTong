$(function() {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1-6个之间'
            }
        }
    })
    initUserInfo(); //初始化用户信息
    //初始化用户信息函数 
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: 'my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }

                //调用form.val()快速为表单赋值
                layui.form.val('formUserInfo', res.data)
            }
        })
    }
    //重置表单的数据
    $('#btnReset').on('click', function(e) {
        //阻止表单的默认重置行为
        e.preventDefault();
        initUserInfo(); //因为还没提交，所以重置为默认的

    })

    //监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: 'my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('提交成功！')
                    //调用父页面的方法，重新渲染用户的头像和信息 index.js里面的getUserInfo()
                    //本页面是iframe，是子页面
                window.parent.getUserInfo();
            }
        })
    })

})