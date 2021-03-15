$(function () {
    // 定义校验规则
    let form = layui.form
    form.verify({
        // 原密码
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        // 新密码
        samePwd: function (value) {
            if (value == $('[name="oldPwd"]').val()) {
                return '新密码和原密码不能相同'
            }
        },
        // 确认密码
        rePwd: function (value) {
            if (value != $('[name="newPwd"]').val()) {
                return '两次输入不一致，请重新输入！'
            }
        },
    })

    //表单提交
    $('.layui-form').on('submit', function (e) {
        // 阻止默认提交
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status != 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg('密码修改成功')
                $('.layui-form')[0].reset()
                //  跳转到页面
                location.href = "/login.html";
            }
        })



    })

    // 入口函数结束
})