var dur = 300;
var isOpen = true;
var activeName = "on";
var sub_height = [];
var max_height = 0;
var $headerWrap, $gnb, $gnb_li, $gnb_ul;

$(document).ready(function () {
  initDOM();
  bindingEvent();

  $("#gnb>li").each(function(index,item){
    $(item).attr("data",`../img/bg-sub-img0${index+1}.png`);
  });

  $("#gnb>li").on("mouseenter focusin", function () {
    var bgImg = $(this).attr("data");
    $(".change-img img").attr("src",bgImg);
  }); 
  
});


/*----------------------------함수선언부----------------------------*/

//DOM 초기화
function initDOM() {
  $headerWrap = $(".headerWrap");
  $headerTop = $(".headerTop");
  $gnb = $("#gnb");
  $gnb_li = $gnb.children("li");
  $gnb_ul = $gnb.find("ul");
}

//이벤트 바인딩
function bindingEvent() {

  // GNB메뉴
  gnb();
  // 모바일메뉴
  mbMenu();
  // 슬라이드
  slideItem();
  // WOW
  new WOW().init();
}

// GNB메뉴
function gnb() {
  max_height = gnb_max_height();

  $gnb_li.on("mouseenter focusin", function () {
    var $this = $(this);
    openSub($this);
    if (isOpen) {
      createSubPanel();
    }
    $gnb_ul.height(max_height);
  });

  $headerWrap.on("mouseleave ", function () {
    closeSub();
  });

  $headerTop.on("mouseenter ", function () {
    closeSub();
  });

  $gnb_li.on("mouseleave focusout", function () {
    $(this).children("a").removeClass(activeName);
  });

  //제일 높은값의 gnb ul 값 반환하는 함수
  function gnb_max_height() {
    $gnb_li.each(function (index) {
      var ul_height = $(this).find("ul").height();
      sub_height.push(ul_height);
      max_height = Math.max(max_height, sub_height[index]);
    });
    return max_height;
  }

  //서브패널 동적으로 생성후 열어주는 함수
  function createSubPanel() {
    // $subPanel = '<div class="bgSub">';
    // $headerWrap.prepend($subPanel);
    // $subPanel = $(".bgSub");
    $(".bgSub").height(max_height);
    // $(".bgSub").stop(true, true).slideDown(dur);
    $(".bgSub").show();
  }

  //gnb ul 열어주는 함수
  function openSub($this) {
    $gnb_ul.show();
    $this.children("a").addClass(activeName);

  }

  //gnb_ul 닫고 sub_panel 닫은뒤 제거하는 함수
  function closeSub() {
    $gnb_ul.hide();
    // $(".bgSub").stop(true, true).slideUp(dur);
    $(".bgSub").hide();

  }
}

//모바일 메뉴
function mbMenu() {
  $(".open-mb-nav").on("click", function () {
    $(".mMenu").stop().animate({
      "right": "0%",
    }, 600);
  });

  $(".mclose").on("click", function () {
    $(".mMenu").stop().animate({
      "right": "-100%",
    }, 600);
  });

  $("#demo1").navgoco({
    caret: '<span class="caret"></span>',
    accordion: true,
    openClass: 'open',
    save: true,
    cookie: {
      name: 'navgoco',
      expires: false,
      path: '/'
    },
    slide: {
      duration: 400,
      easing: 'swing'
    }
  });
}

// 슬라이드
function slideItem() {

  // 메인 비쥬얼 슬라이드
  $(function () {
    var slideSetting = {
      slidesPerView: "1",
      spaceBetween: 0,
      // observer: true,
      // observeParents: true,
      loopAdditionalSlides: 1, // 슬라이드 반복 시 마지막 슬라이드에서 다음 슬라이드가 보여지지 않는 현상 수정
      // // watchOverflow : true, // 슬라이드가 1개 일 때 pager, button 숨김 여부 설정
      // loop: true,
      speed: 2000,
      autoplay: {
        // 자동 슬라이드 설정 , 비 활성화 시 false
        delay: 2500, // 시간 설정
        disableOnInteraction: false, // false로 설정하면 스와이프 후 자동 재생이 비활성화 되지 않음
      },
      navigation: {
        nextEl: '.mainContent__left .banner__btn-wrap--next', // 다음 버튼 클래스명
        prevEl: '.mainContent__left .banner__btn-wrap--prev', // 이번 버튼 클래스명
      },
      pagination: {
        // 페이징 설정
        el: ".swiper-pagination",
        clickable: true, // 페이징을 클릭하면 해당 영역으로 이동, 필요시 지정해 줘야 기능 작동
      },

    };

    $(".mainContent__left .banner__btn-wrap--start").on("click", function () {
      mainSlide.autoplay.start();
      $(".mainContent__left .banner__btn-wrap--stop").show();
      $(".mainContent__left .banner__btn-wrap--start").hide();
      $(".mainContent__left .banner__btn-wrap--stop").focus();
      return false;

    });
    $(".mainContent__left .banner__btn-wrap--stop").on("click", function () {
      mainSlide.autoplay.stop();
      $(".mainContent__left .banner__btn-wrap--stop").hide();
      $(".mainContent__left .banner__btn-wrap--start").show();
      $(".mainContent__left .banner__btn-wrap--start").focus();
      return false;
    });

    const mainSlide = new Swiper("#visual-slide", slideSetting);
  });

  // 배너 슬라이드
  $(function () {

    var slideSetting2 = {
      slidesPerView: "5",
      observer: true,
      observeParents: true,
      navigation: {
        nextEl: '.banner .banner__btn-wrap--next', // 다음 버튼 클래스명
        prevEl: '.banner .banner__btn-wrap--prev', // 이번 버튼 클래스명
      },
      // loop: true,
      speed: 1000,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      breakpoints: { //반응형 조건 속성
        1200: { //640 이상일 경우
          slidesPerView: 4, //레이아웃 2열
        },
        900: {
          slidesPerView: 3,
        },
        600: {
          slidesPerView: 2,
        },
      }
    };

    const bannerSlide = new Swiper("#banner-slide", slideSetting2);

    $(".banner .banner__btn-wrap--start").on("click", function () {
      bannerSlide.autoplay.start();
      $(".banner .banner__btn-wrap--stop").show();
      $(".banner .banner__btn-wrap--start").hide();
      $(".banner .banner__btn-wrap--stop").focus();
      return false;

    });
    $(".banner .banner__btn-wrap--stop").on("click", function () {
      bannerSlide.autoplay.stop();
      $(".banner .banner__btn-wrap--stop").hide();
      $(".banner .banner__btn-wrap--start").show();
      $(".banner .banner__btn-wrap--start").focus();
      return false;
    });



  });

}
