$(function () {
    // 获取用户信息
    getUserInfo()

    // 退出
    $('#btnLogout').on('click', function () {
        // 弹窗
        layer.confirm('确认退出？', { icon: 3, title: '提示' }, function (index) {
            //清除 token 页面跳转 
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        });
        // 清除 token

        // 跳转路径

    })
})


// 别的页面也要用，放到全局
function getUserInfo() {
    // 发送ajax
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        // 封装到 $.ajaxPrefilter
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: (res) => {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data)
        }
    })
}

// 渲染用户信息
function renderAvatar(user) {
    // 渲染名称 
    let name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 渲染头像
    if (user.user_pic !== null) {
        // 有头像
        $('.layui-nav-img').show().attr('src', user.user_pic)
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        let text = name[0].toUpperCase()
        $('.text-avatar').show().html(text)
    }
}