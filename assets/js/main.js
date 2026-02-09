$(function () {

  /* =================================
  ヘッダー
   ================================= */
  $(function () {
  const $win = $(window);
  const $body = $("body");

  const $mv = $("#jsMV");
  const $upper = $("#jsHeaderUpper");
  const $lower = $("#jsHeaderLower");

  const $hamburger = $("#jsHamburger");
  const $drawer = $("#jsDrawer");
  const $overlay = $("#jsDrawerOverlay");
  const $close = $("#jsDrawerClose");

  // -----------------------
  // 高さをCSS変数に入れる
  // -----------------------
  function setHeaderHeights() {
    const upperH = $upper.outerHeight() || 0;
    const lowerH = $lower.outerHeight() || 0;

    document.documentElement.style.setProperty("--header-upper-h", upperH + "px");
    document.documentElement.style.setProperty("--header-lower-h", lowerH + "px");
  }

  // -----------------------
  // MVが見えなくなったら固定（.is-stuck）
  // -----------------------
  function checkSticky() {
    if (!$mv.length) return;

    const mvBottom = $mv.offset().top + $mv.outerHeight();
    const scrollTop = $win.scrollTop();

    // MVが完全に消えたら固定にしたいので「>= mvBottom」
    const stuck = scrollTop >= mvBottom;

    $body.toggleClass("is-stuck", stuck);

    // 状態切り替えで高さが変わることがあるので毎回更新
    setHeaderHeights();
  }

  // 初回
  setHeaderHeights();
  checkSticky();

  // スクロール・リサイズ・ロード後（フォント遅延対策）
  $win.on("scroll", checkSticky);
  $win.on("resize", function () {
    setHeaderHeights();
    checkSticky();
  });
  $win.on("load", function () {
    setHeaderHeights();
    checkSticky();
  });

  // -----------------------
  // ドロワー（ハンバーガー）
  // -----------------------
  function openDrawer() {
    $drawer.addClass("is-open").attr("aria-hidden", "false");
    $hamburger.attr("aria-expanded", "true");
    $body.addClass("is-drawer-open");
    $close.trigger("focus");
  }

  function closeDrawer() {
    $drawer.removeClass("is-open").attr("aria-hidden", "true");
    $hamburger.attr("aria-expanded", "false");
    $body.removeClass("is-drawer-open");
    $hamburger.trigger("focus");
  }

  $hamburger.on("click", function () {
    if ($drawer.hasClass("is-open")) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  $overlay.on("click", closeDrawer);
  $close.on("click", closeDrawer);

  // ESCで閉じる
  $(document).on("keydown", function (e) {
    if (e.key === "Escape" && $drawer.hasClass("is-open")) {
      closeDrawer();
    }
  });

  // ドロワー内リンククリックで閉じる（任意）
  $drawer.on("click", "a", function () {
    if ($drawer.hasClass("is-open")) closeDrawer();
  });
});


  /* =================================
  ページ内リンク　ヘッダーの高さ考慮
 ================================= */
  var $header = $('.header');

  function getHeaderH() {
    if (!$header.length) return 0;
    return $header.outerHeight() || 0;
  }

  function scrollToHash(hash, speed) {
    if (!hash || hash === '#') return;

    var $target = $(hash);
    if (!$target.length) return;

    var targetTop = $target.offset().top - getHeaderH();

    $('html, body').stop().animate({
        scrollTop: targetTop
      },
      typeof speed === 'number' ? speed : 400
    );
  }

  $(document).on('click', 'a[href^="#"]', function (e) {
    var href = $(this).attr('href');
    if (!href || href === '#') return;
    if (!$(href).length) return;

    e.preventDefault();

    if (history.pushState) {
      history.pushState(null, null, href);
    } else {
      location.hash = href;
    }

    scrollToHash(href, 400);
  });

  $(window).on('load', function () {
    if (location.hash) {
      scrollToHash(location.hash, 0);
    }
  });


  /* =================================
  アニメーション　フェードイン
 ================================= */
  $(window).scroll(function () {
    const windowHeight = $(window).height(); //ウィンドウの高さ
    const scroll = $(window).scrollTop(); //スクロール量

    $(".fade-in-js").each(function () {
      const targetPosition = $(this).offset().top; //要素の上からの距離
      if (scroll > targetPosition - windowHeight + 100) {
        $(this).addClass("action");
      }
    });
  });


})