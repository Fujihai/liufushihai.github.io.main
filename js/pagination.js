var Pagination = (function(){

  var defaultOptions = {
    currentPage: 1,
    pages: 5,
    containerNode: null,
    onPageClick: null
  };

  var init = function(options = {}){
    defaultOptions = options;

    defaultOptions.containerNode.innerHTML = generateTargetHtml(generatePageItemsHtml());

    bindEvent(defaultOptions.onPageClick);

    function generateTargetHtml(tHtml){
      return `
        <div class="pagination-holder clearfix">
          <div id="light-pagination" class="pagination light-theme simple-pagination">
            <ul>
              <li><a class="page-link prev">&lt;</a></li>
              ${tHtml}
              <li><a class="page-link next">&gt;</a></li>
            </ul>
          </div>
        </div>`;
    }

    function generatePageItemsHtml(){
      var tempHtml = '';
      for(var i = 1; i <= defaultOptions.pages; i++){
        if(i != defaultOptions.currentPage){
          tempHtml += `<li><a class="page-link">${i}</a></li>`;
        }else{
          tempHtml += `<li><a class="current">${i}</a></li>`; 
        }
      }
      return tempHtml;
    }
  };

  var bindEvent = function(onPageClick){
    getElementById('light-pagination').onclick = function(e){
      
      setItemUnselectedByIndex(defaultOptions.currentPage);
      
      updateCurrentPageIndex(e);

      setItemSelectedByIndex(defaultOptions.currentPage);

      updateBtnsStatus();

      onPageClick && onPageClick(defaultOptions.currentPage);
    };

    function setItemSelectedByIndex(idx){
      document.querySelectorAll('#light-pagination a')[idx].className = 'current';
    }
  
    function setItemUnselectedByIndex(idx){
      document.querySelectorAll('#light-pagination a')[idx].className = 'page-link';
    }

    function updateCurrentPageIndex(e){
      var text = e.target.innerHTML || '';
      if(!isNaN(text)){
        defaultOptions.currentPage = parseInt(text);
      }else{
        if(text === '&lt;'){
          defaultOptions.currentPage = defaultOptions.currentPage > 1 ? --defaultOptions.currentPage : defaultOptions.currentPage;
        }else if(text === '&gt;'){
          defaultOptions.currentPage = defaultOptions.currentPage < defaultOptions.pages ? ++defaultOptions.currentPage : defaultOptions.currentPage;
        }
      }
    }

    function updateBtnsStatus(){
      if(defaultOptions.pages != 1){
        if(defaultOptions.currentPage === 1){
          setItemSelectedByIndex(0);
          setItemUnselectedByIndex(defaultOptions.pages + 1);
        }else if(defaultOptions.currentPage === defaultOptions.pages){
          setItemSelectedByIndex(defaultOptions.pages + 1);
          setItemUnselectedByIndex(0);
        }else if(defaultOptions.currentPage > 1 && defaultOptions.currentPage < defaultOptions.pages){
          setItemUnselectedByIndex(0);
          setItemUnselectedByIndex(defaultOptions.pages + 1);
        }
      }
    }
  };

  return {
    init
  };

})();