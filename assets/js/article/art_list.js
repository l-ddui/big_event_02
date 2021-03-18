$(function () {
    // 定义时间过滤器
    template.defaults.imports.dateFormat = function (dtStr) {
        let dt = new Date(dtStr)
        let y = dt.getFullYear()
        let m = padZero(dt.getMonth() + 1)
        let d = padZero(dt.getDate())
        let hh = padZero(dt.getHours())
        let mm = padZero(dt.getMinutes())
        let ss = padZero(dt.getSeconds())
        return `${y} - ${m} - ${d}  ${hh}：${mm}：${ss}`
    }
    // 补0
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    // 定义查询参数
    let q = {
        pagenum: 1,  //int页码值
        pagesize: 2, // int每页显示多少条数据
        cate_id: "", // string文章分类的 Id
        state: "",   //string文章的状态，可选值有：已发布、草稿
    }

    let layer = layui.layer
    // 初始化文章列表
    initTable()
    function initTable() {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: q,
            success: (res) => {
                if (res.status != 0) {
                    return layer.msg('获取文章列表失败！')
                }
                // console.log(123);

                // 获取成功
                let htmlStr = template('tpl_table', { data: res.data })
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }
        })
    }

    // 初始化分类列表
    let form = layui.form
    initCate() //调用函数
    // 封装
    function initCate() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: (res) => {
                if (res, status != 0) {
                    return layui.layer(res.message)
                }
                let htmlStr = template('tpl_cate', { data: res.data })
                $('[name="cate_id"]').html(htmlStr)
                // 单选 多选 下拉 都需要 重新渲染
                form.render()
            }
        })
    }

    //筛选功能
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        // 获取输入框的值
        let state = $('[name="state"]').val()
        let cate_id = $('[name="cate_id"]').val()
        // 把获取的值作为参数赋值给获取文章列表的实参
        q.state = state
        q.cate_id = cate_id
        //重新渲染文章列表
        initTable()
    })


    // 调用分页
    let laypage = layui.laypage;
    function renderPage(total) {
        //执行一个laypage实例
        laypage.render({
            //注意，这里的 test1 是 ID，不用加 # 号
            elem: 'pageBox',
            count: total,  //数据总数，从服务端得到
            limit: q.pagesize, //每页显示的条数
            curr: q.pagenum, //起始页
            limits: [1, 2, 3, 4, 5, 10],
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数
                // 改变当前页
                // 把点击的页数 赋值给当前页面的页码
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                //首次不执行
                if (!first) {
                    // 不是首页加载，就执行
                    initTable()
                }
            }
        });



    }

    // 删除

    $('tbody').on('click', '.btn-delete', function () {
        let Id = $(this).attr('data-id')
        layer.confirm('确认删除？', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                method: 'get',
                url: '/my/article/delete/' + Id,
                success: (res) => {
                    if (res.status != 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('删除成功！')
                    // 页面删除按钮的个数 等于1，并且剩下不止一页时，点击删除按钮，自动跳到前一页
                    // $('.btn-delete').length 表示当前所在页面所有的删除按钮个数
                    if ($('.btn-delete').length == 1 && q.pagenum > 1) q.pagenum--;
                    // 重新渲染页面
                    initTable()
                }
            })
            layer.close(index);
        });

    })




    // 入口函数结束
})