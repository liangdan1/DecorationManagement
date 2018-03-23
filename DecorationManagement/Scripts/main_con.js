/*
 name : yanggang;
 QQ:392017299;
 E-mail:yanggang1@conew.com;
 */
var UA = window.navigator.userAgent,IsAndroid = (/Android|HTC/i.test(UA)),IsIPad = !IsAndroid && /iPad/i.test(UA),IsIPhone = !IsAndroid && /iPod|iPhone/i.test(UA),IsIOS = IsIPad || IsIPhone,clearAnimatea = null;
var testStyle=document.createElement('div').style,
camelCase=function(str){
    return str.replace(/^-ms-/, "ms-").replace(/-([a-z]|[0-9])/ig, function(all, letter){
        return (letter+"").toUpperCase();
    });
},
cssVendor=(function(){
    var ts=testStyle,
        cases=['-o-','-webkit-','-moz-','-ms-',''],i=0;
    do {
        if(camelCase(cases[i]+'transform') in ts){
            return cases[i];
        }
    } while(++i<cases.length);
    return '';
})(),
transitionend=(function(){
    return ({
        '-o-':'otransitionend',
        '-webkit-':'webkitTransitionEnd',
        '-moz-':'transitionend',
        '-ms-':'MSTransitionEnd transitionend',
        '':'transitionend'
    })[cssVendor];
})(),
isCSS = function(property){
    var ts=testStyle,
        name=camelCase(property),
        _name=camelCase(cssVendor+property);
    return (name in ts) && name || (_name in ts) && _name || '';
};
var liebaoBrowser = {
    domAnimation: function(ele) {
        ele.detBtn.hover(function() {
                $(this).addClass('btn-hover');
            },
            function() {
                $(this).removeClass('btn-hover');
            });
        ele.navhover.hover(function() {
                $(this).find("i").addClass('nav-hover');
            },
            function() {
                $(this).find("i").removeClass('nav-hover');
            });
        ele.downBtn.hover(function() {
                $(this).addClass('down-btn');
            },
            function() {
                $(this).removeClass('down-btn');
            });
        ele.watchLb.hover(function() {
                ele.code.addClass('code-show').show();
            },
            function() {
                ele.code.removeClass('code-show').hide();
            });
        ele.fnLi.hover(function() {
                var radiusEle = $(this).find('div');
                $(this).addClass('span-img');
                if (ele.aniMation) {
                    radiusEle.addClass('zoom');
                } else {
                    radiusEle.show();
                }
            },
            function() {
                var radiusEle = $(this).find('div');
                $(this).removeClass('span-img');
                if (ele.aniMation) {
                    radiusEle.removeClass('zoom');
                } else {
                    radiusEle.hide();
                }
            });
    },
    banSlide: function(item, time, ele, speed) {
        clearTimeout(clearAnimatea);
        var length = ele.slide.length - 1;

        /*自动播放*/
        function autoPlay() {
            item++;
            if (item == length + 1) {
                item = 0;
                aniObj(item);
            } else {
                aniObj(item);
            }
            spanCur(item);
            clearAnimatea = setTimeout(autoPlay, time);
        }

        clearAnimatea = setTimeout(autoPlay, time);

        /*点击切换动画*/
        function slidePrev(e) {
            e.preventDefault();
            if (!ele.slide.is(':animated')) {
                if (item == 0) {
                    item = length;
                    aniObj(item);
                } else {
                    item--;
                    aniObj(item);
                }
                spanCur(item);
            }
        };

        function slideNext(e) {
            e.preventDefault();
            if (!ele.slide.is(':animated')) {
                if (item == length) {
                    item = 0;
                    aniObj(item);
                } else {
                    item++;
                    aniObj(item);
                }
                spanCur(item);
            }
        };

        /* 点击切换动画 */
        ele.slideCur.click(function() {
            clearTimeout(clearAnimatea);
            ele.slideCur.removeClass('cur');
            $(this).addClass('cur');
            item = $(this).index();
            if (item <= length) {
                aniObj(item);
            }
        });

        /*执行动画方法*/
        function aniObj(getNum) {
            ele.slide.hide().css({ opacity: 0.5, zIndex: 0 });
            ele.slide.eq(getNum).show().stop(true, true).animate({ opacity: 1, zIndex: 8 }, speed);
            if (ele.aniMation) {
                ele.slide.removeClass('banAnimate');
                ele.slide.eq(getNum).addClass('banAnimate');
            }
        }

        /*当前动画指示*/
        function spanCur(eqNum) {
            ele.slideCur.removeClass('cur');
            ele.slideCur.eq(eqNum).addClass('cur');
        }

        /* 触发执行事件 */
        ele.prev.click(slidePrev);
        ele.next.click(slideNext);
        /* 手机上执行touch事件 */
        if (IsIOS || IsAndroid) {
            var touchMain = document.getElementById('touchMain');
            var page = {
                x: 0,
                y: 0
            }
            var touched;
            touchMain.addEventListener('touchstart',
                function(e) {
                    clearTimeout(clearAnimatea);
                    page.x = e.changedTouches[0].pageX;
                    page.y = e.changedTouches[0].pageY;
                });
            touchMain.addEventListener('touchend',
                function(e) {
                    var pageX = e.changedTouches[0].pageX - page.x;
                    var pageY = e.changedTouches[0].pageY - page.y;
                    if (Math.abs(pageX) > 50) {
                        if (pageX > 0) {
                            slidePrev(e);
                        } else {
                            slideNext(e);
                        }
                    }
                    clearAnimatea = setTimeout(autoPlay, time);
                    touched = null;
                });
            /* 防止阻止touchend事件 */
            touchMain.addEventListener('touchmove',
                function(e) {
                    if (null == touched) {
                        var pageX = e.changedTouches[0].pageX - page.x;
                        var pageY = e.changedTouches[0].pageY - page.y;
                        touched = Math.abs(pageX - page.x) < Math.abs(pageY - page.y);
                    }
                    if (!touched) e.preventDefault();
                });
        } else {
            /*滑过主体区域停止动画*/
            ele.stopAnimte.hover(function() {
                    clearTimeout(clearAnimatea);
                },
                function() {
                    clearAnimatea = setTimeout(autoPlay, time);
                });
        }
        /*初始化动画*/
        ele.slide.eq(0).show().addClass('banAnimate');
    },
    maxImgInit: function(ele) {
        if (ele.windowMain.width() > 760) {
            ele.maxImg.hover(function() {
                    if (ele.aniMation) {
                        $(this).addClass('aniimgstyle');
                    } else {
                        $(this).addClass('imgstyle');
                    }
                },
                function() {
                    if (ele.aniMation) {
                        $(this).removeClass('aniimgstyle');
                    } else {
                        $(this).removeClass('imgstyle');
                    }
                });
        } else {
            return false;
        }
    },
    windowEvent: function(ele){
        if(!IsIOS && !IsAndroid){
            if(ele.windowMain.height() < 640){
                ele.downlaodMain.removeClass('position');
                ele.downlaodMain.addClass('padding');
            }else{
                ele.downlaodMain.removeClass('padding');
                ele.downlaodMain.addClass('position');
            }
        }
    },
    flipObj: function(ele,time){
        if(!IsIOS && !IsAndroid){
            setTimeout(function(){
                if(ele.aniMation){
                    ele.codeImg.show().addClass('flip');
                    ele.phoneImg.hide();
                }else{
                    ele.codeImg.show();
                    ele.phoneImg.hide();
                }
            },time);
            ele.phoneImg.click(function(){
                ele.phoneImg.hide().removeClass('flip');
                ele.codeImg.show().addClass('flip');
            });
            ele.codeImg.click(function(){
                ele.codeImg.hide().removeClass('flip');
                ele.phoneImg.show().addClass('flip');
            });
        }else{
            $('.pc-download').css({position:'absolute',left:'0',zIndex:'11',top:'156px;'});
            $('.phone-download').css({position:'absolute',left:'0',zIndex:'12',top:'-156px'});
        }
    },
    staJS: function(){
        $(document).on('click','a',function(e){
            var statData = $(this).attr('stat');
            try {
                _hmt.push(['_trackEvent',statData, 'webLB', 'click', 'download',statData]);
            } catch (e) {}
        });
    },
    shareFunction: function(){
        var shareInfo = {
            nSina: $('.n-sina'),
            nQQ: $('.n-qq'),
            nSpace: $('.n-space')
        }
        /* 新闻分享分享当前新闻 */
        shareInfo.nSina.click(function(){
            var myThis = $(this),
                title = myThis.parents('.news-info').find('h3').text(),
                linkUrl = myThis.parents('.news-info').find('a').attr('href'),
                appkey = '1234653',
                pic = myThis.parents('.news-main').find('img').attr('src');
            window.open('http://v.t.sina.com.cn/share/share.php?title='+encodeURIComponent(title)+'&url='+encodeURIComponent(linkUrl)+'&appkey='+encodeURIComponent(appkey)+'&pic='+encodeURIComponent(pic));
            return false;
        });
        shareInfo.nQQ.click(function(){
            var myThis = $(this),
                title = myThis.parents('.news-info').find('h3').text(),
                linkUrl = myThis.parents('.news-info').find('a').attr('href'),
                appkey = '1234653',
                pic = myThis.parents('.news-main').find('img').attr('src');
            window.open('http://v.t.qq.com/share/share.php?title='+encodeURIComponent(title)+'&url='+encodeURIComponent(linkUrl)+'&appkey='+encodeURIComponent(appkey)+'&pic='+encodeURIComponent(pic));
            return false;
        });
        shareInfo.nSpace.click(function(){
            var myThis = $(this),
                title = myThis.parents('.news-info').find('h3').text(),
                linkUrl = myThis.parents('.news-info').find('a').attr('href'),
                pic = myThis.parents('.news-main').find('img').attr('src');
            window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title='+encodeURIComponent(title)+'&url='+encodeURIComponent(linkUrl)+'&pic='+encodeURIComponent(pic));
            return false;
        });
    },
    init: function(ele){
        liebaoBrowser.banSlide(0,5000,ele,500);
        liebaoBrowser.domAnimation(ele);
        liebaoBrowser.windowEvent(ele);
        liebaoBrowser.maxImgInit(ele);
        ele.windowMain.on('resize',function(){
            liebaoBrowser.windowEvent(ele);
            liebaoBrowser.maxImgInit(ele);
        });
        liebaoBrowser.flipObj(ele,2000);
        liebaoBrowser.staJS();
        liebaoBrowser.shareFunction();
    }
};
$(function(){
    var domEle = { navhover: $('.nav-main a'), detBtn: $('.details'), maxImg: $('.news-img'), fnLi: $('.ft-list li'), aniMation: isCSS('animation'), watchLb: $('#watch-lb'), code: $('.watch-code'), downBtn: $('.beta-info a'), downlaodMain: $('.downlaod-main'), windowMain: $(window), bodyEle: $('body'), stopAnimte: $('.slide,.prev,.next,.item'), prev: $('.prev'), next: $('.next'), slide: $('.slide'), slideCur: $('.item a'), phoneImg: $('.phone-img'), codeImg: $('.code-img') };
    domEle.downlaodMain.show();
    liebaoBrowser.init(domEle);
});

var temp_name;
var temp_phone;
$(function () {
    var mySwiper = new Swiper('#bannerswiper',
        {
            autoplay: 5000,
            pagination: '.banner-swiper-pagination',
            paginationClickable: true,
            createPagination: true,
            //                prevButton:'.swiper-button-prev',
            //                nextButton:'.swiper-button-next',
            //                lazyLoading : true,
            //                lazyLoadingInPrevNext : true,
            //                lazyLoadingInPrevNextAmount : 2,
            loop: true
        });
    $('#banner-prev').on('click',
        function() {
            mySwiper.swipePrev();
        });
    $('#banner-next').on('click',
        function() {
            mySwiper.swipeNext();
        });

    $('.banner-search-box-close-btn').on('click',
        function() {
            $('.banner-search-box').fadeOut();
        });

    $('.banner-search-box-btn').on('click',
        function() {
            //alert($('#bannerForm').serialize())
            var name = $.trim($('#banner_name').val());
            var phone = $.trim($('#banner_phone').val());
            if (name == "") {
                new Msg({ id: 'js_msg8', icon: 'warning', text: "请填写称呼！" });
                $('#banner_name').focus();
                return false;
            }

            if (phone == "") {
                $('#banner_phone').focus();
                new Msg({ id: 'js_msg8', icon: 'warning', text: "请填写手机号码！" });
                return false;
            }

            if (!new RegexKit().matchPhoneNumber(phone)) {
                new Msg({ id: 'js_msg8', icon: 'warning', text: "请填写正确的手机号码或座机号码！" });
                return false;
            }

            if (temp_name == name && temp_phone == phone) {
                new Msg({ id: 'js_msg8', icon: 'warning', text: "请勿重复提交！" });
                return false;
            }

            $.ajax({
                type: "get",
                url: ctx + "/ajax/consultInformation/save",
                data: $('#bannerForm').serialize(),
                dataType: "json",
                success: function(data) {
                    //console.info(data);
                    if (data.status) {
                        temp_name = name;
                        temp_phone = phone;
                        alert(data.mes);
                    } else {
                        alert(data.mes);
                    }
                }
            });
        });

});


(function(window, $) {

    $('.quotation_left_modal').on('mouseover',
        function() {
            var index = $(this).data('index');
            $(this).addClass('quotation_left_modal_active');
            $(this).siblings().removeClass('quotation_left_modal_active');
            var siblingDom = $(this).siblings();
            for (var i = 0; i < siblingDom.length; i++) {
                $($(siblingDom[i]).children().children()[0]).show();
                $($(siblingDom[i]).children().children()[1]).hide();
            }

            $($(this).children().children()[0]).hide();
            $($(this).children().children()[1]).show();

            $('#quotation_right_slide_' + index).siblings().hide();
            $('#quotation_right_slide_' + index).show();

        });

})(window, window.jQuery);

$(function() {
    var compent = Vue.extend({
        mounted: function() {
            var that = this;
            var mySwiper = new Swiper('.talkto-design-swiper',
                {
                    pagination: '.designer-swiper-pagination',
                    //                      prevButton:'.designer-swiper-btn-left',
                    //                      nextButton:'.designer-swiper-btn-right',
                    paginationClickable: true,
                    preventLinks: false,
                    loop: true,
                    onSlideChangeEnd: function(swiper) {
                        var index = swiper.activeIndex;
                    }
                });
            $('.designer-swiper-btn-left').on('click',
                function() {
                    mySwiper.swipePrev();
                });
            $('.designer-swiper-btn-right').on('click',
                function() {
                    mySwiper.swipeNext();
                });
        }
    });
    new compent({ el: '.talkto-designer-box' });
});

$(".homeBanner ul").cycle({
    /* fx: 'scrollLeft', */
    fx: 'scrollHorz',
    timeout: 3000,
    pause: 1,
    pager: '.houmeNumber',
    prev: '.houmePrev',
    next: '.houmeNext',
    pagerEvent: 'mouseover',
    cleartype: !$.support.opacity,
    activePagerClass: 'hover',
    pagerAnchorBuilder: function (idx, slide) {
        idx += 1;
        return '<span href="javascript:void(0)" class="num' + idx + '">' + +'</span>';
    }
});
/*品牌实力*/
$('.homeBrand').addClass('hover');
$(".homeBrandBanner ul").cycle({
    fx: 'fade',
    timeout: 0,
    pause: 1,
    pager: '.homeBrandNumber',
    next: '.homeBrandNext',
    pagerEvent: 'mouseover',
    cleartype: !$.support.opacity,
    activePagerClass: 'hover',
    pagerAnchorBuilder: function (idx, slide) {
        idx += 1;
        return '<span href="javascript:void(0)" class="num' + idx + '">' + +'</span>';
    }
});
$('.homeBrandNext,.homeBrandNumber span').click(function () {
    var brandNum = $('.homeBrandNumber .hover').index();
    $('.homeBrandBanner li .left').removeClass('hover');
    $('.homeBrandBanner li').eq(brandNum).find('.left').addClass('hover');

});
$('.homeBrandNumber span').hover(function () {
    var brandNum = $('.homeBrandNumber .hover').index();
    $('.homeBrandBanner li .left').removeClass('hover');
    $('.homeBrandBanner li').eq(brandNum).find('.left').addClass('hover');
});

//服务对象
$('.houseObjectClick').click(function () {
    $('.houseObjectOvh').toggleClass('hover');
    $(this).find('span').toggle();
})
//house
$(function () {
    //拆改服务
    var oldWidth = $('.houseOldGai li').outerWidth() + 45,
        oldNum = $('.houseOldGai li').length,
        oldLi = $('.houseOldGai li').index();
    $('.houseOldGai ul').width(oldWidth * oldNum);
    $('.houseOldGaiText a').click(function () {
        var leftRight = $(this).attr('class'),
            oldData = $('.houseOldGai ul').attr('num');
        if (leftRight == 'left') {
            if (oldData == 1) {
                $('.houseOldGai .left').hide();
            } else if (oldData != 1) {
                $('.houseOldGai .right').show();
            }
            if (oldData != '0') {
                var oldUlLeft = $('.houseOldGai ul').css('left'),
                    oldLeft = parseInt(oldUlLeft.replace(/[^0-9]/ig, ""));
                oldData--
                $('.houseOldGai ul').attr('num', oldData).stop().animate({
                    'left': -oldWidth * oldData + 'px'
                });
            }
        } else if (leftRight == 'right') {
            if (oldData == 3) {
                $('.houseOldGai .right').hide();
            } else {
                $('.houseOldGai .left').show();
            }
            if (oldData != oldLi - 2) {
                var oldUlLeft = $('.houseOldGai ul').css('left'),
                    oldLeft = parseInt(oldUlLeft.replace(/[^0-9]/ig, ""));
                oldData++
                $('.houseOldGai ul').attr('num', oldData).stop().animate({
                    'left': '-' + oldWidth * oldData + 'px'
                });
            }
        }
    })

})
