/**
 * 右侧浮动工具栏
 * @author zhaochengju
 * @type {{}}
 */
$(function () {
    var Tool = {
        config: {
            imageBasePath: "/Content/Images",
            template: function () {
                return $("<div class='fixeRight'><a>在线客服</a><a>预约装修</a><a>装修报价</a><a>" +
                    "<div><p><img src='" + this.imageBasePath + "/wx111.jpg'><span>添加微信好友</span><em>装修不用愁！</em></p>" +
                    "<p><img src='" + this.imageBasePath + "/wx111.jpg'><span>添加微信好友</span><em>一万套装修案例</em></p>" +
                    "<img src='" + this.imageBasePath + "/fixe_ma_2.png'></div></a><a></a></div>");
            }
        },
        call: function () {
            // 美洽客服
            (function (m, ei, q, i, a, j, s) {
                m[i] = m[i] || function () {
                    (m[i].a = m[i].a || []).push(arguments);
                };
                j = ei.createElement(q),
                    s = ei.getElementsByTagName(q)[0];
                j.async = true;
                j.charset = 'UTF-8';
                //j.src = '//static.meiqia.com/dist/meiqia.js';
                s.parentNode.insertBefore(j, s);
            })(window, document, 'script', '_MEIQIA');
            _MEIQIA('entId', 48780);
            // 无按钮模式
            _MEIQIA('withoutBtn');
            _MEIQIA("showPanel");
            //ga('send', 'event', '联系客服', 'Click', '右侧浮动菜单');
            //_paq.push(['trackEvent', 'Clicked', '右侧浮动菜单', '联系客服']);
        },
        order: function () {
            //RES.order();
           // _paq.push(['trackEvent', 'Clicked', '右侧浮动菜单', '在线预约']);
        },
        offer: function () {
            //RES.offer();
            //_paq.push(['trackEvent', 'Clicked', '右侧浮动菜单', '免费报价']);
        },
        top: function () {
            $('body,html', window.parent.document).animate({
                scrollTop: 0
            }, 300);
        },
        init: function () {
            var template = this.config.template();
            template.find("a:eq(0)").click(function () {
                Tool.call();
            });
            template.find("a:eq(1)").click(function () {
                Tool.order();
            });
            template.find("a:eq(2)").click(function () {
                Tool.offer();
            });
            template.find("a:eq(3)").hover(function () {
                $(this).find('div').show().stop().animate({
                    'left': '-195px',
                    'opacity': '1'
                });
            }, function () {
                $(this).find('div').hide().stop().animate({
                    'left': '-163px',
                    'opacity': '0',
                    'display': 'none'
                });
            });
            template.find("a:eq(4)").click(function () {
                Tool.top();
            });
            $('body').append(template);
            if ($(document).scrollTop() >= 660) {
                $('.fixeRight').show().stop().animate({
                    'opacity': '1'
                });
            } else {
                $('.fixeRight').hide().stop().animate({
                    'opacity': '0'
                });
            }
        }
    };
    Tool.init();
    $(window).scroll(function() {
        if ($(document).scrollTop() >= 100) {
            $('.fixeRight').show().stop().animate({
                'opacity': '1'
            });
        } else {
            $('.fixeRight').hide().stop().animate({
                'opacity': '0'
            });
        }
    });
	
	var obj=$('#textScroll');
	if(obj.find('li').length>5)
	{
		var d=setInterval(function()
		{
			obj.children('li').eq(0).animate({height:0},'slow',function()
			{
				obj.append($(this).removeAttr('style'));
			});
		},2000);
	}
});