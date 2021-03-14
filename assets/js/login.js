$(function () {
    // 注册页面
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 登陆页面
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 定义验证规则
    let form = layui.form
    form.verify({
        // 密码规则
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能输入空格'
        ],
        // 确认密码规则
        repwd: function (value) {
            let pwd = $('.reg-box input[name="password"]').val()
            if (value != pwd) {
                return '两次密码输入不一致，请重新输入！'
            }
        }
    })

    // 注册功能
    let layer = layui.layer
    $('#form_reg').on('submit', function (e) {
        // 阻止表单提交
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: {
                username: $('.reg-box input[name=username]').val(),
                password: $('.reg-box input[name=password]').val()
            },
            success: (res) => {
                if (res.status != 0) {
                    // 返回状态判断
                    return layer.msg(res.message)
                }
                // 提交成功后处理代码   
                layer.msg('注册成功，请登录！')
                // 切换到登陆页面
                $('#link_login').click()
                // 重置表单
                $('#form_reg')[0].reset()
            }
        })



    })

    // 登录功能
    $('#form_login').on('submit', function (e) {
        // 阻止表单提交
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜您，登录成功！')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })










    // 入口函数结束
})