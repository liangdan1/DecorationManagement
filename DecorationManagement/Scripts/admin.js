//广告 + 装修报价 + 计算报价 = 17-11-02 张思学

//广告 + 装修报价弹窗
function AddTo() {
    //加入CSS文件
    $("head").append("<link>");
    css = $("head").children(":last");
    css.attr({
        rel: "stylesheet",
        type: "text/css",
        href: "/assets/2017pc/ad/ad.css"
    });
    //判断cookie是否存在，存在不执行弹窗
    if (Adcookie != 'esc') {
        if (areaOptions == "" || areaOptions == null) {
            return;
        }

        //添加弹窗框
        $('body').append(
            '<!--弹窗装修报价 + 推广广告-->' +
            '<div class="popGJ">' +
            '<!--内容-->' +
            '<div class="popGJ_Center">' +
            '</div>' +
            '</div>'
        );

        //在活动时间内添加广告
        if (AdTime >= AdStart && AdTime < AdEnd) {
            $('.popGJ_Center').append(
                //图片容器
                $('<div/>').addClass('popGj_Guang').css({
                    'width': AdW,
                    'height': AdH,
                    'margin-top': '-' + AdH / 2
                }).append(
                    //A标签跳转
                    $('<a/>').attr({
                        'target': '_blank',
                        'href': AdUrl
                    }).append(
                        //图片路径
                        $('<img/>').attr('src', AdImg)
                    ),
                    //关闭
                    $('<img/>').addClass('popGJ_Jsq_Esc').attr({
                        'src': '/assets/2017pc/img/fixe_new/gj_esc_2.png',
                        'onclick': 'AdOut()'
                    })
                )
            );
            //8秒自动关闭弹窗
            setTimeout(function () {
                $(".popGJ").fadeOut(2000, function () {
                    $(this).remove();
                    $.cookie('Ad_cookie', 'esc', {
                        expires: 1
                    });
                });
            }, 5000);
        } else {
            var AdJsq = $('<div/>').addClass('popGJ_Jsq'),
                AdJsqEsc = $('<img/>').addClass('popGJ_Jsq_Esc').attr({
                    'src': '/assets/2017pc/img/fixe_new/gj_esc_1.png',
                    'onclick': 'AdOut()'
                }),
                AdJsqHead = $('<div/>').addClass('popGJ_Jsq_Head').append('装修计算器<span>目前已有<em>' + num + '</em>人获取装修报价</span>'),
                AdJsqFrom = $('<div/>').addClass('popGJ_Jsq_From'),
                AdJsqInput = $('<div/>').addClass('popGJ_Jsq_Input'),
                AdJsqButton = $('<div/>').addClass('popGJ_Jsq_Button');
            $('.popGJ_Center').append(
                //计算器容器
                AdJsq.append(
                    AdJsqEsc, //计算器关闭
                    AdJsqHead, //计算器头部
                    //表单容器
                    AdJsqFrom.append(
                        //表单
                        AdJsqInput.append(
                            '<p>' +
                            '<span>装修城市</span>' +
                            '<select name="ad_areaCode">' +
                            areaOptions +
                            '</select>' +
                            '</p>' +
                            '<p>' +
                            '<span>房屋面积</span>' +
                            '<input id="popGj_Mj" name="ad_mj" type="text" placeholder="请输入房屋面积">' +
                            '<i>㎡</i>' +
                            '</p>' +
                            '<p class="popGJ_Jsq_Select">' +
                            '<span>房屋户型</span>' +
                            '<select>' +
                            '<option>1室</option>' +
                            '<option>2室</option>' +
                            '<option>3室</option>' +
                            '<option>4室</option>' +
                            '</select>' +
                            '<select>' +
                            '<option>1厅</option>' +
                            '<option>2厅</option>' +
                            '</select>' +
                            '<select>' +
                            '<option>1厨</option>' +
                            '</select>' +
                            '<select>' +
                            '<option>1卫</option>' +
                            '<option>2卫</option>' +
                            '</select>' +
                            '</p>' +
                            '<p>' +
                            '<span>您的姓名</span>' +
                            '<input type="text" name="ad_username" placeholder="请输入您的姓名">' +
                            '</p>' +
                            '<p>' +
                            '<span>您的手机</span>' +
                            '<input type="text" name="ad_mobile" placeholder="请输入您的手机号码">' +
                            '</p>'
                        ),
                        //Button
                        AdJsqButton.append(
                            '<input type="button" value="开始计算">' +
                            '<div class="popGJ_Jsq_Button_Num">' +
                            '<p>' +
                            '<span>材料费（元）</span>' +
                            '<em class="Ad_cl">43152</em>' +
                            '</p>' +
                            '<p>' +
                            '<span>人工费（元）</span>' +
                            '<em class="Ad_rg">22476</em>' +
                            '</p>' +
                            '<p>' +
                            '<span>运输费（元）</span>' +
                            '<em class="Ad_ys">3920</em>' +
                            '</p>' +
                            '<p>' +
                            '<span>仓储费（元）</span>' +
                            '<em class="Ad_cc">3272</em>' +
                            '</p>' +
                            '<p>' +
                            '<span>您家的装修预算（元）</span>' +
                            '<em class="Ad_zs">71920</em>' +
                            '</p>' +
                            '</div>'
                        )
                    )
                )
            );

            AdJsqButton.find("input[type=button]").click(function () {
                reservationByZXBJ('201711hometc',AdJsqFrom.find('input[name=ad_username]').val(),
                    AdJsqFrom.find('input[name=ad_mobile]').val(),
                    AdJsqFrom.find('select[name=ad_areaCode]').val(),
                    AdJsqFrom.find('input[name=ad_mj]').val(), 0,
                    function (data) {
                        AdCount(data);
                    });
            });

            //装修报价居室匹配
            $("#popGj_Mj").keyup(function () {
                var HxVal = $(this).val();
                $(this).val($(this).val().replace(/[^0-9.]/g, ''));
                if (HxVal <= 60 && HxVal >= 1) {
                    $('.popGJ_Jsq_Select').find('select').eq('0').val('1室');
                    $('.popGJ_Jsq_Select.popGJ_Jsq_Select').find('select').eq('1').val('1厅');
                    $('.popGJ_Jsq_Select').find('select').eq('2').val('1厨');
                    $('.popGJ_Jsq_Select').find('select').eq('3').val('1卫');
                };
                if (HxVal <= 90 && HxVal >= 61) {
                    $('.popGJ_Jsq_Select').find('select').eq('0').val('2室');
                    $('.popGJ_Jsq_Select').find('select').eq('1').val('1厅');
                    $('.popGJ_Jsq_Select').find('select').eq('2').val('1厨');
                    $('.popGJ_Jsq_Select').find('select').eq('3').val('1卫');
                };
                if (HxVal <= 110 && HxVal >= 91) {
                    $('.popGJ_Jsq_Select').find('select').eq('0').val('3室');
                    $('.popGJ_Jsq_Select').find('select').eq('1').val('1厅');
                    $('.popGJ_Jsq_Select').find('select').eq('2').val('1厨');
                    $('.popGJ_Jsq_Select').find('select').eq('3').val('1卫');
                };
                if (HxVal <= 130 && HxVal >= 111) {
                    $('.popGJ_Jsq_Select').find('select').eq('0').val('3室');
                    $('.popGJ_Jsq_Select').find('select').eq('1').val('2厅');
                    $('.popGJ_Jsq_Select').find('select').eq('2').val('1厨');
                    $('.popGJ_Jsq_Select').find('select').eq('3').val('1卫');
                };
                if (HxVal <= 150 && HxVal >= 131) {
                    $('.popGJ_Jsq_Select').find('select').eq('0').val('3室');
                    $('.popGJ_Jsq_Select').find('select').eq('1').val('2厅');
                    $('.popGJ_Jsq_Select').find('select').eq('2').val('1厨');
                    $('.popGJ_Jsq_Select').find('select').eq('3').val('2卫');
                };
                if (HxVal > 151) {
                    $('.popGJ_Jsq_Select').find('select').eq('0').val('4室');
                    $('.popGJ_Jsq_Select').find('select').eq('1').val('2厅');
                    $('.popGJ_Jsq_Select').find('select').eq('2').val('1厨');
                    $('.popGJ_Jsq_Select').find('select').eq('3').val('2卫');
                };
            }).bind("paste", function () {
                $(this).val($(this).val().replace(/[^0-9.]/g, ''));
            }).css("ime-mode", "disabled");
            //计算数字变化
            var Ad_num = 0;
            var Ad_datas = [
                {
                    Ad_cl: 36100,
                    Ad_rg: 17000,
                    Ad_ys: 3400,
                    Ad_cc: 2500,
                    Ad_zs: 59000,
            },
                {
                    Ad_cl: 39900,
                    Ad_rg: 19000,
                    Ad_ys: 5650,
                    Ad_cc: 3440,
                    Ad_zs: 67990,
            },
                {
                    Ad_cl: 43152,
                    Ad_rg: 22476,
                    Ad_ys: 3920,
                    Ad_cc: 3272,
                    Ad_zs: 71920,
            },
                {
                    Ad_cl: 48546,
                    Ad_rg: 24273,
                    Ad_ys: 4256,
                    Ad_cc: 3835,
                    Ad_zs: 80910,
            },
                {
                    Ad_cl: 53940,
                    Ad_rg: 26700,
                    Ad_ys: 4750,
                    Ad_cc: 4150,
                    Ad_zs: 89900,
            }
        ];
            var Ad_work_id = setInterval(function () {
                if (Ad_num >= Ad_datas.length) {
                    Ad_num = 0;
                }
                $(".Ad_cl").html(Ad_datas[Ad_num].Ad_cl);
                $(".Ad_rg").html(Ad_datas[Ad_num].Ad_rg);
                $(".Ad_ys").html(Ad_datas[Ad_num].Ad_ys);
                $(".Ad_cc").html(Ad_datas[Ad_num].Ad_cc);
                $(".Ad_zs").html(Ad_datas[Ad_num].Ad_zs);
                Ad_num++;
            }, 500);
        }

    }
}

//开始计算
function AdCount(AdNum) {
    if (!AdNum) AdNum = 0;
    //删除上一个弹窗
    $('.popGJ').remove();
    //添加弹窗框
    $('body').append(
        '<div class="popGJ"><div class="popGJ_Center"><div class="popGJ_Jsq"><img class="popGJ_Jsq_Esc" src="/assets/2017pc/img/fixe_new/gj_esc_1.png"  onclick="AdOut()"><img class="popGJ_Jsq_Img" src="/assets/2017pc/img/fixe_new/gj_head.jpg"><div class="popGJ_Jsq_Jg"><p>您的装修费用约为：<em>' + AdNum + '</em></p><span>稍后爱空间的家装顾问会与您进一步沟通，请注意接听来电</span><i>*该报价为预估费用，实际装修报价以量房实测为准</i></div></div></div></div>'
    );
}

//关闭弹窗
function AdOut() {
    $('.popGJ').remove();
    $.cookie('Ad_cookie', 'esc', {
        expires: 1
    });
}