$(function () {
    // 自定义验证规则
    let form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length <= 1 || value.length > 6) {
                return '昵称长度在 2~6 位之间！'
            }
        }
    })

    // 用户渲染
    let layer = layui.layer
    initUserInfo()
    // 封装函数
    function initUserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            // data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 成功 渲染
                form.val("formUserInfo", res.data)
            }
        })
    }

    // 表单重置
    $('#btnReset').on('click', function (e) {
        // 阻止默认事件
        e.preventDefault()
        // 渲染
        initUserInfo()
    })

    // 修改用户信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('用户信息修改成功！')
                window.parent.getUserInfo()
            }
        })
    })


    // 入口函数结束
})