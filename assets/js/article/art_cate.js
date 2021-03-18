$(function () {
    let layer = layui.layer
    // 页面加载 渲染
    initArtCateList()
    // 封装函数
    function initArtCateList() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: (res) => {
                // console.log(res);
                let htmlStr = template('t1', { data: res.data })
                $('tbody').html(htmlStr)
            }
        })
    }


    // 添加文章类别
    let indexAdd = null
    $('#btnAdd').on('click', function () {
        // 利用框架，显示提示添加文章类别区域
        indexAdd = layer.open({
            type: 1,
            title: '添加文章类别',
            area: ['500px', '260px'],
            content: $('#dialog-add').html()
        });
    })

    // 提交文章分类添加 事件委托
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault(
            $.ajax({
                method: 'post',
                url: '/my/article/addcates',
                data: $(this).serialize(),
                success: (res) => {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    // 添加成功，渲染
                    initArtCateList()
                    // 提示
                    layer.msg('文章分类添加成功！')
                    // 关闭弹窗
                    layer.close(indexAdd)
                }
            })
        )
    })

    // 修改文章类别
    let indexEdit = null
    let form = layui.form
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            title: '修改文章类别',
            area: ['500px', '260px'],
            content: $('#dialog-edit').html()
        })
        let Id = $(this).attr('data-id')
        // console.log(Id);
        $.ajax({
            method: 'get',
            url: '/my/article/cates/' + Id,
            success: (res) => {
                form.val('form-edit', res.data)
            }
        })
    })


    // 提交文章分类修改 事件委托
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg('更新分类信息成功！')
                // 关闭弹窗
                layer.close(indexEdit)
                // 重新渲染页面
                initArtCateList()
            }
        })
    })


    // 删除
    $('tbody').on('click', '.btn-delete', function () {
        let Id = $(this).attr('data-id')
        layer.confirm('是否确定删除？', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                method: 'get',
                url: '/my/article/deletecate/' + Id,
                success: (res) => {
                    if (res.status != 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('删除成功！')
                    initArtCateList()
                    layer.close(index)
                }
            })

        })



    })




    // 入口函数结束
})