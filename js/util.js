createElementByTagName = function(tagName){
    return document.createElement(tagName);
}

getElementById = function(id){
    return typeof(id) === 'string' ? document.getElementById(id) : id;
}

getElementsByTagName = function(tagName){
    return typeof(tagName) === 'string' ? document.getElementsByTagName(tagName) : tagName;
}

removeChildren = function(node){
    while(node.firstChild){
        node.removeChild(node.firstChild);
    }
}

removeChildById = function(node, id){
    var child = getElementById(id);
    if(child){
        node.removeChild(child);
    }
}

hideElement = function(id){
    var ele = getElementById(id);
    ele.style.display = 'none';
}

showElement = function(id){
    var ele = getElementById(id);
    ele.style.display = '';
}

getBasePreUrl = function(){
    return 'https://api.github.com/repos/' + config.githubUserName + '/' 
    + config.githubRepoName;
}

getIssuesPreUrl = function(){
    return getBasePreUrl() + '/issues';
}

getLabelsUrl = function(){
    return getBasePreUrl() + '/labels';
}

getIssueUrlById = function(id){
    var preUrl = getIssuesPreUrl();
    var url = preUrl + '/' + id;
    url += '?access_token=' + config.accessToken;
    return url;
}

getPageUrl = function(page){
    var preUrl = getIssuesPreUrl();
    var url = preUrl + '?per_page=' + config.perPageSize + '&page=' + page;
    url += '&access_token=' + config.accessToken;
    return url;
}


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