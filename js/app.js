var pageIdx = config.defaultPageIdx;
var isLoadedOnce = false;

function gotoArticlesListPage() {
  loadPage(pageIdx);
}

function loadPage(pageIdx) {
  if (isDefaultPage(pageIdx)) {
    showLargeLoadingGif();
  } else {
    showSmallLoadingGif();
  }

  getJSON(getPageUrl(pageIdx), function(data, headers) {
    if (data) {
      removeLoadingGif();
    }

    addTitleToArticleList(data);

    if (getLastPageIdx(headers) <= 1) {
    } else {
      if (!isLoadedOnce) {
        generatePagination();
      }
    }
  });
}

function gotoArticleContentPage(id) {
  getJSON(getIssueUrlById(id), function(data) {
    showTitleAndContent(data.title, data.body);
  });
}

function showTitleAndContent(title, body) {
  var aTitle = getElementById("article-content-title"),
    txt = document.createTextNode(title),
    content = getElementById("article-content");
  aTitle.appendChild(txt);
  renderMarkdown(content, body);
}

function showLargeLoadingGif() {
  var loadingAttr = {
    id: "large-gif-container",
    src: "./imgs/Ripple-1s-100px.gif",
    className: "align-center"
  };
  var titleList = getElementById("articles-title-list");
  var loadingHtml = `
    <div id=${loadingAttr.id}>
      <img src=${loadingAttr.src} 
          className=${loadingAttr.className}/>
      <p style="text-align: center; font-size: 16px; margin: 16px 0px;">加载中</p>
    </div>
  `;
  titleList.insertAdjacentHTML("beforeend", loadingHtml);
}

function addTitleToArticleList(data) {
  var titleList = getElementById("articles-title-list");
  for (var i = 0, len = data.length; i < len; i++) {
    var liHtml = `
      <li>
        <a href=?p=${data[i].number} class='title-item'>${data[i].title}</a>
      </li>`;
    titleList.insertAdjacentHTML("beforeend", liHtml);
  }
}

function loadMoreArticlesToList(pageIdx) {
  var titleList = getElementById("articles-title-list"),
    li = createElementByTagName("li"),
    href = createElementByTagName("a"),
    txt = document.createTextNode("加载更多");
  li.id = "loading-more-li";
  li.className = "align-center";
  titleList.appendChild(li);
  href.id = "load-more-btn";
  href.className = "align-center load-more-btn";
  // href.href = "javascript:loadPage("+ (pageIdx + 1) +");";

  // 打印数据
  // href.onclick = function(){
  //   getJSON(getLabelsUrl(), function(data, headers){
  //     console.log(data);
  //     for(var i = 0; i < data.length; i++){
  //       console.log(data[i].name);
  //     }
  //   });
  // };

  href.appendChild(txt);
  li.appendChild(href);
}

function removeLoadingGif() {
  removeChildById(getElementById("articles-title-list"), "large-gif-container");
}

function getLastPageIdx(headers) {
  var link = {};
  if (headers.link) {
    var linkArray = headers.link.split(",");
    for (var i = 0; i < linkArray.length; i++) {
      var m = linkArray[i].match(
        /\?per_page=(\d+)&page=(\d+)&access_token=(\w+)>; rel="(\w+)"/
      );
      if (m) {
        link[m[4]] = {
          per_page: m[1],
          page: m[2]
        };
      }
    }
  }
  if (link.last.page) {
    return parseInt(link.last.page);
  }
}

function isDefaultPage(pageIdx) {
  return pageIdx === config.defaultPageIdx ? true : false;
}

function isTheLastPage(pageIdx, lastPageIdx) {
  return pageIdx < lastPageIdx ? true : false;
}

function generatePagination() {
  var titleList = getElementById("articles-title-list");
  var titleItem = createElementByTagName("li");
  titleItem.style = "padding: 16px 0px;margin: 0px auto; text-align: center;";
  titleList.appendChild(titleItem);

  return Pagination.init({
    currentPage: 1,
    pages: 8,
    containerNode: titleItem,
    onPageClick: function(idx) {
      console.log(`当前页：${idx}`);
      getJSON(getPageUrl(idx), function(data, headers) {
        updateTitleItems(data);
      });
    }
  });
}

function updateTitleItems(data){
  var titleItemList = document.querySelectorAll('.title-item');
  for(var i = 0, len = data.length; i < len; i++){
    titleItemList[i].href = `?p=${data[i].number}`;
    titleItemList[i].textContent = data[i].title;
  }
}

window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    getElementById("header").className = "header scroll-header-shadow";
  } else {
    getElementById("header").className = "header";
  }
}
