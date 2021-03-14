$(function () {
    // 开发环境服务器 
    let baseURL = 'http://api-breakingnews-web.itheima.net'
    // 测试环境服务器 
    // let baseURL = 'http://api-breakingnews-web.itheima.net'
    // 生产环境服务器 
    // let baseURL = 'http://api-breakingnews-web.itheima.net'

    $.ajaxPrefilter(function (params) {
        params.url = baseURL + params.url
    })


})