$(function () {
    // 获取用户信息
    getUserInfo()
})


// 别的页面也要用，放到全局
function getUserInfo() {
    // 发送ajax
    $.ajax({
        type: 'get',
        url: '/my/userinfo',

        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
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