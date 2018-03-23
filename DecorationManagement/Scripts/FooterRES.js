/**
 * 底部预约浮层
 * @author zhaochengju
 */
$(function () {
    "use strict";
    var FooterRES = {
        config: {
            // 配置参数
            imageBasePath: "/Content/images",
            popTemplate: function () {
                var num = 0;
                return $("<div class='fixeFooter'>" +
                    "<div><div><img src='" + this.imageBasePath + "/fixe_footer.png'>" +
                    "<p>0元设计免费抢</p><span>今日还剩<em>" + num + "</em>个名额</span>" +
                    "</div><div><input type='text' placeholder='请输入您的称呼' class='userName'>" +
                    "<input type='text' placeholder='请输入您的手机号码' class='mobile'>" +
                    "<input type='button' value='立即领取' class='button'>" +
                    "<img class='fixeFooterEsc' src='" + this.imageBasePath + "/fixe_footer_1.png'>" +
                    "</div></div></div>");
            },
            btnTemplate: function () {
                return $("<div class='fixeFooterOn'><img src='" + this.imageBasePath + "/fixe_footer_2.png' soll='1'></div>");
            }
        },
        show: function () {
            // 显示预约浮层
            var current = $(document).scrollTop(), height = 660;
            $('.fixeFooter,.fixeFooterOn').remove();
            var popTemplate = this.config.popTemplate();
            $('body').append(popTemplate);
            if (current < height) {
                popTemplate.stop().animate({
                    'bottom': '-90px'
                });
            } else {
                popTemplate.stop().animate({
                    'bottom': '0px'
                });
            }
            popTemplate.find('.fixeFooterEsc').click(function () {
                FooterRES.hide();
                _paq.push(['trackEvent', 'Clicked', '底部浮层', '关闭按钮']);
            });
            // 预约操作
            popTemplate.find('input:button').click(function() {
                var msg = $.reservation(popTemplate.find('.userName').val(),
                    popTemplate.find('.mobile').val(),
                    function() {
                        _paq.push(['trackEvent', 'Clicked', '底部浮层', '预约按钮']);
                    });

                if (msg.indexOf("预约成功") >= 0) {
                    aboutOk();
                } else {
                    alert(msg);
                }
            });
        },
        hide: function () {
            // 隐藏预约浮层
            var current = $(document).scrollTop(), height = 660;

            $('.fixeFooter').stop().animate({
                'bottom': '-90px'
            });
            $('.fixeFooterOn').stop().animate({
                'opacity': '0'
            });

            setTimeout($('.fixeFooter,.fixeFooterOn').remove(), 1000);

            var btnTemplate = this.config.btnTemplate();
            $('body').append(btnTemplate);
            if (current < height) {
                btnTemplate.fadeTo().stop().animate({
                    'opacity': '0'
                });
            } else {
                btnTemplate.fadeTo().stop().animate({
                    'opacity': '1'
                });
            }
            btnTemplate.click(function () {
                FooterRES.show();
            });
        }
    };
    FooterRES.show();
    $(window).scroll(function() {
        var current = $(document).scrollTop(), height = 660;
        if (current < height) {
            $('.fixeFooter').stop().animate({
                'bottom': '-90px'
            });
            $('.fixeFooterOn').stop().animate({
                'opacity': '0'
            });
        } else {
            $('.fixeFooter').stop().animate({
                'bottom': '0px'
            });;
            $('.fixeFooterOn').stop().animate({
                'opacity': '1'
            });
        }
    });
});
