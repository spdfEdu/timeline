$.each(data, function (i) {
   var htmlEntity =  `
   <div class="js-timeline_item ag-timeline_item">
            <div class="ag-timeline-card_box">
              <div class="js-timeline-card_point-box ag-timeline-card_point-box">
                <div class="ag-timeline-card_point">${data[i].year}</div>
              </div>
              <div class="ag-timeline-card_meta-box">
                <div class="ag-timeline-card_meta">${data[i].title}</div>
              </div>
            </div>
            <div class="ag-timeline-card_item">
              <div class="ag-timeline-card_inner">
                <div class="ag-timeline-card_img-box">
                  <img src="${data[i].img}" class="ag-timeline-card_img" width="640" height="360" />
                </div>
                <div class="ag-timeline-card_info">
                  <div class="ag-timeline-card_title">${data[i].title}</div>
                  <div class="ag-timeline-card_desc">
                    <p class="date-desc">${data[i].date}</p>
                    ${data[i].desc}
                  </div>
                </div>
              </div>
              <div class="ag-timeline-card_arrow"></div>
            </div>
            </div>
          </div>`
        console.log(htmlEntity);
          
   var div = $(document.createElement('div'));
   div.html(htmlEntity)
   $('#insert-box').append(div)

});

(function ($) {
  $(function () {

    $(window).on('scroll', function () {
      fnOnScroll();
    });

    $(window).on('resize', function () {
      fnOnResize();
    });


    var agTimeline = $('.js-timeline'),
      agTimelineLine = $('.js-timeline_line'),
      agTimelineLineProgress = $('.js-timeline_line-progress'),
      agTimelinePoint = $('.js-timeline-card_point-box'),
      agTimelineItem = $('.js-timeline_item'),
      agOuterHeight = $(window).outerHeight(),
      agHeight = $(window).height(),
      f = -1,
      agFlag = false;

    function fnOnScroll() {
      agPosY = $(window).scrollTop();

      fnUpdateFrame();
    }

    function fnOnResize() {
      agPosY = $(window).scrollTop();
      agHeight = $(window).height();

      fnUpdateFrame();
    }

    function fnUpdateWindow() {
      agFlag = false;

      agTimelineLine.css({
        top: agTimelineItem.first().find(agTimelinePoint).offset().top - agTimelineItem.first().offset().top,
        bottom: agTimeline.offset().top + agTimeline.outerHeight() - agTimelineItem.last().find(agTimelinePoint).offset().top
      });

      f !== agPosY && (f = agPosY, agHeight, fnUpdateProgress());
    }

    function fnUpdateProgress() {
      var agTop = agTimelineItem.last().find(agTimelinePoint).offset().top;

      i = agTop + agPosY - $(window).scrollTop();
      a = agTimelineLineProgress.offset().top + agPosY - $(window).scrollTop();
      n = agPosY - a + agOuterHeight / 2;
      i <= agPosY + agOuterHeight / 2 && (n = i - a);
      agTimelineLineProgress.css({height: n + "px"});

      agTimelineItem.each(function () {
        var agTop = $(this).find(agTimelinePoint).offset().top;

        (agTop + agPosY - $(window).scrollTop()) < agPosY + .5 * agOuterHeight ? $(this).addClass('js-ag-active') : $(this).removeClass('js-ag-active');
      })
    }

    function fnUpdateFrame() {
      agFlag || requestAnimationFrame(fnUpdateWindow);
      agFlag = true;
    }


  });
})(jQuery)
