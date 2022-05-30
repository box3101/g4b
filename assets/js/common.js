$(document).ready(function () {
  bindingEventSub();

});

/*----------------------------함수선언부----------------------------*/

//이벤트 바인딩
function bindingEventSub() {

  // 데이터피커
  datepicker();

  // 신청 체크박스
  proposal();

  // 서브패널
  subPanel();

  // 탭
  comTab();

  // 상단 맨위로
  goTop();

}

function subPanel() {
  $(".content-location .content-location-inner > ul > li").on("click", function () {

    const $this = $(this);
    const sitePanel = $(".site_panel");
    const sitePanelValue = $(this).find(sitePanel).hasClass("is-active");

    $(".content-location .content-location-inner > ul > li:nth-of-type(2)").find("i").attr("class", "fa-solid fa-angle-down ml5");
    $(".content-location .content-location-inner > ul > li:nth-of-type(3)").find("i").attr("class", "fa-solid fa-angle-down ml5");


    if(!sitePanelValue){
      active($this);
    }else{
      thisClick($this);
    }

    function active($this) {
      $(".site_panel").removeClass("is-active");
      $this.find(".site_panel").addClass("is-active");
      $this.find("i").attr("class", "fa-solid fa-angle-up ml5");
    }

    function thisClick($this) {
      $this.find(".site_panel").removeClass("is-active");
      $this.find("i").attr("class", "fa-solid fa-angle-down ml5");
    }

    // if($(this))
  });
}

function datepicker() {
  // 날짜
  $(".datePicker").each(function () {
    $(this).datepicker({
      autoHide: true,
    });
  });
}

function proposal() {

  $(".proposal").on("click", function () {

    if ($(this).hasClass("is-active")) {
      $(this).removeClass("is-active");
    } else {
      $(this).addClass("is-active");
    }

  });

};

function comTab() {

  // com var
  var tabList = $(".tab__list");
  var tabItem = $(".tab__item");
  var tabCnt = $(".tab-content");

  // init
  tabCnt.hide();
  tabCnt.eq(0).show();

  // click event
  tabList.on("click", function (e) {
    e.preventDefault();

    var $this = $(this);
    // 메뉴버튼
    menuBtn($this);

    // 콘텐츠변경
    changeCnt($this);
  });

  function menuBtn($this) {
    tabList.find(tabItem).removeClass("is-active");
    $this.find(tabItem).addClass("is-active");
  }

  function changeCnt($this) {
    var currentValue = $this.find(tabItem).attr("href");

    tabCnt.hide();
    $(currentValue).show();
  }
};

function goTop() {
  $(".go-top > a").click(function () {
    $('html, body').stop().animate({ scrollTop: 0 }, 400);
    return false;
  });
}