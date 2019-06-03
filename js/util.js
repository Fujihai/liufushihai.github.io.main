// 创建 DOM 结点
createElementByTagName = function(tagName){
    return document.createElement(tagName);
}

// 根据 id 返回 DOM 结点
getElementById = function(id){
    return typeof(id) === 'string' ? document.getElementById(id) : id;
}

// 根据标签名返回 DOM 结点列表
getElementsByTagName = function(tagName){
    return typeof(tagName) === 'string' ? document.getElementsByTagName(tagName) : tagName;
}

// 移除当前 DOM 结点的所有子元素
removeChildren = function(node){
    while(node.firstChild){
        node.removeChild(node.firstChild);
    }
}

// 根据 id 来移除某个结点的子元素
removeChildById = function(node, id){
    var child = getElementById(id);
    if(child){
        node.removeChild(child);
    }
}

// 根据 id 来隐藏元素
hideElement = function(id){
    var ele = getElementById(id);
    ele.style.display = 'none';
}

// 根据 id 来显示元素
showElement = function(id){
    var ele = getElementById(id);
    ele.style.display = '';
}

// 获取所有 issues 的前缀 URL
getIssuesPreUrl = function(){
    return 'https://api.github.com/repos/' + config.githubUserName + '/' 
            + config.githubRepoName + '/issues';
}

// 获取单条 issue 内容
getIssueUrlById = function(id){
    var preUrl = getIssuesPreUrl();
    var url = preUrl + '/' + id;
    url += '?access_token=' + config.accessToken;
    return url;
}

// 分页查询
getPageUrl = function(page){
    var preUrl = getIssuesPreUrl();
    var url = preUrl + '?per_page=' + config.perPageSize + '&page=' + page;
    url += '&access_token=' + config.accessToken;
    return url;
}

// 将返回的 Markdown 文件格式渲染成可展示的 HTML 文件数据
renderMarkdown = function(content, text){
    var post = {
        "text": text,
        "mode": 'gfm'
    };

    var mdUrl = "https://api.github.com/markdown";
    mdUrl += '?access_token=' + config.accessToken;
    ajax(post, mdUrl, function(data){
        content.innerHTML = data;
    });
}

// window.location.search 用于获取页面上的 url 从问号(?)开始的 URL (查询部分)
loadPageUrlVar = function(urlVar){
    return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(urlVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}