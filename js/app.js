var pageIdx = config.defaultPageIdx;

function gotoArticlesListPage(){
  loadPage(pageIdx);
}

function loadPage(pageIdx) {
  if(isDefaultPage(pageIdx)){
    showLargeLoadingGif();
  }else{   
    showSmallLoadingGif();
  }
  
  getJSON(getPageUrl(pageIdx), function(data, headers){
    if(data){
      removeAllLoadingGif();
    }
    
    addTitleToArticleList(data);

    if(isTheLastPage(pageIdx, getLastPageIdx(headers))){
      loadMoreArticlesToList(pageIdx);      
    }
  });
}

function gotoArticleContentPage(id){
  getJSON(getIssueUrlById(id), function(data){
    showTitleAndContent(data.title, data.body);
  });
}

function showTitleAndContent(title, body){
  var aTitle = getElementById('article-content-title'),
      txt = document.createTextNode(title),
      content = getElementById("article-content");
  aTitle.appendChild(txt);
  renderMarkdown(content, body);
}

function showLargeLoadingGif(){
  var titleList = getElementById('articles-title-list'),
      loading = createElementByTagName('img');
  loading.id = "large-gif-container";
  loading.src = './imgs/Blocks-1s-150px.gif';
  loading.className = 'align-center';
  titleList.appendChild(loading);
}

function showSmallLoadingGif(){
  var titleList = getElementById('articles-title-list'),
      loadMore = getElementById('load-more-btn');
    if(loadMore){
      removeChildById(titleList, 'loading-more-li');
      var li = createElementByTagName('li'),
          newMore = createElementByTagName('img');
      li.id = 'small-gif-container';
      newMore.id = 'more';
      newMore.src = './imgs/Eclipse-1s-80px.gif';
      li.appendChild(newMore);
      titleList.appendChild(li);
  }
}

function addTitleToArticleList(data){
  var titleList = getElementById('articles-title-list');
  for(var i = 0; i < data.length; i++){
    var titleItem = createElementByTagName('li'),
        aHref = createElementByTagName('a'),
        txt = document.createTextNode(data[i].title);
    titleList.appendChild(titleItem); 
    aHref.className = 'title-item';
    aHref.href = '?p=' + data[i].number + '&t=' + new Date().getTime();
    aHref.appendChild(txt);
    titleItem.appendChild(aHref);
  }
}

function loadMoreArticlesToList(pageIdx){
  var titleList = getElementById('articles-title-list'),
      li = createElementByTagName('li'),
      href = createElementByTagName("a"),
      txt = document.createTextNode("加载更多");
  li.id = 'loading-more-li';
  li.className = 'align-center';
  titleList.appendChild(li);
  href.id = "load-more-btn";
  href.className = 'align-center load-more-btn';
  href.href = "javascript:loadPage("+ (pageIdx + 1) +");";
  href.appendChild(txt);
  li.appendChild(href);
}

function removeAllLoadingGif(){
  removeChildById(getElementById('articles-title-list'), 'large-gif-container');
  removeChildById(getElementById('articles-title-list'), 'small-gif-container');
}

function getLastPageIdx(headers){
  var link = {};
  if (headers.link) {
    var linkArray = headers.link.split(",");
    for (var i=0; i<linkArray.length; i++) {
        var m = linkArray[i].match(/\?per_page=(\d+)&page=(\d+)&access_token=(\w+)>; rel="(\w+)"/);
        if (m) {
            link[m[4]] = {
                "per_page": m[1],
                "page": m[2]
            }
        }
    }
  }
  if(link.last.page){
    return parseInt(link.last.page);
  }
}

function isDefaultPage(pageIdx){
  return pageIdx === config.defaultPageIdx ? true : false;
}

function isTheLastPage(pageIdx, lastPageIdx){
  return pageIdx < lastPageIdx ? true : false;
}

// 页面效果处理
window.onscroll = function(){scrollFunction();};

function scrollFunction(){
  if(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20){
    getElementById('header').className = 'header scroll-header-shadow';
  }else{
    getElementById('header').className = 'header';
  }
}



