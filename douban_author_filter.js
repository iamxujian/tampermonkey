// ==UserScript==
// @name         douban_author_filter
// @namespace    https://github.com/iamxujian
// @version      0.1
// @description  enter something useful
// @author       iamxujian
// @include      /^http://www.douban.com/group/(26926|257523|beijingzufang|zhufang)/.+$/
// @grant        none
// ==/UserScript==

blacklist_title = [
    //疑似标明高价
    /[789]\d\d\d/,
    
    // 地方不想去
    /(草房|西二旗|传媒大学|天通苑|通州|石景山|回龙观|霍营|龙泽|五道口|金盏(乡|家园))/,
    // 望京附近不想去的地方
    /(马泉营)/,
    
    // 杂事
    /(姑娘|女(孩|生)|妹子|女室友)/,
    /(般|搬)家/,
    /限女/,
    /(寻|求)合?租/,
    /(热线|退款|(退票)?电话(号码)?|)是(多少|什么)/,
    /怎\S{0,8}(申请)?(投诉|退款)/,
    /求短租/,
    /多久\S{0,8}到账/,
    /^唯品会\S{0,8}不发货/,
    /人工\S{0,8}(号码|服务|投诉)/,
    /财付通被骗/,
    /^定期分享/,
    
    // 广告
    /^【找房必看】北京租房完全攻略/,
    /北京租房周刊/,
    /(苹果试玩|北京有偿访谈)/,
    /(服|改).?(务|签).?电.?话.?是.?多.?少.?$/,
    /你留言，我来帮你找房/,
    /走投无路/,
    /有钱赚/,
    /累.+叁伍/,
    /(招聘|画画)/,
    /蛋壳/,
    /^爱音乐/,
    /肾\S{0,4}虚/,
    /美容/,
    /^iphone(试玩|的看一|看过来)/i,
    /^☂\S{0,20}衣/,
    /(ziroom|自如)/i,
    ]


blacklist_author = [
    
    // 广告
    
    // 诈骗
    
    // 发布多套房源
    
    // 中介
    /^(丁丁租房|创客优家)/, /蛋壳/,
    
    // 垃圾
    ]

blacklist_author_match = {
    //template
    // "xxxxxxxx":1, 
    
    //诈骗
    "年轻是种意境":1, "哥哥闯红灯":1, "流动的城市":1, "男朋友":1, "已注销":1, "ClaudioLee":1,

    
    //广告
    "斯文已逝":1, "一寸丹心":1, "如也":1, "北京叁伍":1, "国乐小课":1, "北京art-35":1, "合租吧":1,
    "清风":1, "xin":1, "clilil":1, "蜜糖罐罐小主":1, "大鯨魚小星星":1, "金牌经纪人李俊":1, "摇唇":1,
    "漂亮的黄脸婆":1, "故春旧里":1, "Park":1, "一槌定音":1, "玲珑":1, "涓子":1, "宋家庄短租房":1,
    "囧猫小墨":1, "郭小果":1, "蜂鸟艺术品运输":1, "宇多田剥励":1,
    
    //中介
    // 1. 一人多套房源
    // 2. 多人一套房源
    // 3. 中介一般的描述
    // 4. 发帖以后不进行管理, 纯顶
    "yuezixi":1, "链家租房":1, "蛋壳公寓":1, "十年":1, "本宝帅瞎全场":1, "everyone":1,"¥":1, 
    "yesiyun0516":1, "1253":1, "123456":1, "鹤先生的树":1, "有房才有家":1, "蛋壳常营必火":1,
    "用心租房":1, "狂野":1, "yy酱":1, "yu":1, "€你的幸福〜我来":1,  "纠结小nv子":1, "吃亏是福":1,
    "您有特别关注":1, "Andy":1, "A素面朝天嬉笑当":1, "阿伟":1, "生意兴隆":1, "I don't care":1,
    "角落里的幸福":1, "租房子喽":1, "龙猫中介搜索":1, "eric":1, "平常心":1, "山映寒":1, "S.A.M.tpf":1,
    "斜晖转树":1, "泊天冷月鑫":1, "春天来的风":1, "天地逍遥天":1, "煊言罗":1, "且为乐会":1, "岸上吐水泡的鱼":1,
    "永远":1, "灰灰":1, "邹邹郎":1, "农村小伙":1, "白眉大侠":1, "羊毛卷@猫薄荷":1, "上官云雀":1,
    "带刺的玫瑰":1, "dayushu":1, "娟子":1, "HELLOMISSW1213":1, "天创":1, "一只北方狼":1, "大大":1,
    "个性化区域":1, "你若安好便是晴":1, "泡沫之夏":1, "德玛西亚":1, "大师大师":1, "个人":1, "玥婕":1,
    "白领租房":1, "歪理说天下":1, "猪猪她大姨":1, "一娃":1, "小洋":1, "下一站守候":1, "Blue丶BB":1,
    "我相信":1, "孤星泪":1, "好房(放心房)":1, "晨星":1, "、蒜是辣的":1, "呵护有家":1, "coie":1,
    "姠咗→姠祐→啭":1, "金光闪闪":1, "无怨的青春":1, "快乐圆圆":1, "雨点燕燕":1, "家的归属感":1, "小凤":1,
    "琅琊阁主":1, "酋长Archi":1, "司寇奏甘":1, "那时@天真":1, "琴女秒了个兵":1, "体验生活":1, "尤洪祥":1,
    "aa":1, "晓峰998":1, "zzzzwwww123":1, "静心":1, "飘渺无痕":1, "祝怀建":1, "嗯、":1,
    
    //性别歧视
    "Zoe":1, "ZHOULYO":1, "Mr.Guy":1, "蜜缇":1, "Warm":1, "空气凤梨":1, "琳琳":1, "茶。念":1,
    "yujin6799953":1, "emma":1, "苹果先生":1, "ぜ米尔が":1, "我不知道":1, "Mood":1, "木子晶菁":1,
    "牙牙":1, "辛小安Enn":1, "猫蛋":1, "EllieChrist":1, "Havebin❤️":1, "一只猫":1, "双鱼游在北京":1,
    "杨芮":1, "糊涂虫":1, "心系一方":1, "阳光的舞步":1, "梨花雪儿":1, "KissEmi":1, "Emma":1,
    "Tony·Takitani":1, "付磊":1,
    
    //闲聊
    "king":1, "何自己":1, "冰与火，爱与恨":1, "AyWwf":1,
    
    //拒绝合租
    "wudkit":1, "P":1,
    
    //反复无常
    "Jessice":1,

    //tmp
    // 1. 闲聊的
    // 2. 奇葩要求的
    // 3. 转租中介的
    // 4. 环境, 时间不行
    // 5. 租金过高
    "Gavivi是射手座":1, "嘟嘟":1, "viola":1, "Lecontety":1, "爱上HAY":1, "菜菜美奈子":1, "一槌定音":1,
    "小柒柒":1, "Luna":1, "yang":1, "清馨小美":1, "徐雨萌":1, "阿莹":1, "自已":1, "ld":1, "鸿雁之什":1,
    "九州宅男儿":1, "xxxchaer":1, "Miss.Woo-Woo":1, "zhangziq":1, "金先生":1, "牛晨晨":1, "姜小喵":1,
    "迎风撒尿尿一身":1, "mmwj0118":1, "凡仔":1, "仓颉":1, "ಠ_ಠ 吧唧":1, "喵小萌":1, "ninicarol":1,
    "大山威武":1, "喵咪下午茶":1, "小岛":1, "小葱拌豆腐":1,

    }

highlight_title = [
    // 地区
    /(望京|酒仙桥|芍药居)/
    ]

function check_block() {
    msg = false
    if (author in blacklist_author_match) {
        msg = "by complete author match"
        return msg;
    };
    for (b of blacklist_title) {
        if (b.test(title)) {
            msg = "by title " + b;
            return msg;
        };
    }
    for (b of blacklist_author) {
        if (b.test(author)) {
            msg = "by author " + b;
            return msg;
        };
    }
        
}

function check_highlight() {
}

function main() {
    $("table.olt tr").each(function(index) {
        tmp    = $(this).find('td')
        title  = $(tmp[0]).find('a').text().trim()
        author = $(tmp[1]).find('a').text().trim()
        count  = $(tmp[2]).text().trim()
        //console.log("author:", author)
        //console.log("count:", count)
        
        // blacklist
        msg = check_block(title, author)
        if (msg) {
            $(this).remove()
            console.log("remove message:", $(this).text(), msg);
            return;
        }
        //highlight
        for (b of highlight_title) {
            if (b.test(title)) {
                $(this).css('background-color', 'rgba(114, 238, 238, 0.4)')
                console.log("highlight:", $(this).text(), "by", b);
                return;
            };
        }
        if (count == "") {
            $(this).css('background-color', 'rgba(84, 255, 159, 0.4)')
        }
    })                      
}

main()

