// ==UserScript==
// @name         douyu_chat_filter
// @namespace    https://github.com/iamxujian
// @version      0.1
// @description  still testing
// @author       xujian<iamxujian@gmail.com>
// @include      /^http://www.douyutv.com/[^/]+$/
// @grant        none
// ==/UserScript==


console.log("start douyu chat filter")

blacklist = [
    // system info
    /^.*?系统提示.*?欢迎.*?来到.*?的直播间$/,
    // /^ 现在将不会看到其他玩家礼物赠送记录$/,
    // /^  .*?赠送给主播100个鱼丸$/,
    
    //色情 & 诈骗
    /(嶶|威|微|wei|v)\s*?(性|信|幸)/i,
    /死了.*?妈/,
    /^[^:]+?:.*?微信毛片搜索/,
    /^[^:]+?:.*?youyars168/,
    /[④②⑨⑤⑥⑦②⑧]/,
    /w\s*?tt18.\s*?c\s*?om/,
    /絲袜诱惑/,
    /(yueba716|sw66678|387492550)/,
    /和\.*?击\.*?群/,
    /网络[\d\s]*?兼职/,
    /工作室招收/,
    /刷\s*?鱼\s*?丸/,
    /(79|43)wk(．|.|·)\s+c[0o]M/i,
    /^[^:]+?:\s*$/, //纯表情
    /^[^:]+?:.*?[qQ]\W*?(\d[-_]?)+/, //带qq的广告
    /^[^:]+?:(.)\1{3,}$/,
    /^[^:]+?:23{2,}$/,
    /^[^:]+?:↖[^)]+↗/,
    
    //日番组喷子
    /^叛逆丶路西法:/,
    
    /^夜幕的仲夏:/,  //剧透2B
    /^永恒之殇丶丶:/,//剧透2B
    /^emsky:/  //刷拼2B
    
]

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

clearing=false

function clear_chat() {
    if (clearing) {
        //console.log('11111111111111111111111111111111111111111111111111111111111111111111111111111111111')
        console.log('skip clear')
        return
    }
    clearing=true
    var time=new Date()
    console.log('start clean')
    //t=time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
    //t=time.Format("yyyy-MM-dd hh:mm:ss");
    t=time.Format("hh:mm:ss");
    $(".c_cont .c_text li").each(function(index) {
        message = $(this).text()
        for (b of blacklist) {
            if (b.test(message)) {
                $(this).remove()
                console.log("remove message:", message, "by", b);
                return;
            };
        }
        // add time
        if ($(this).find("span#my_time").length===0) {
            $(this).find("p.text_cont").prepend('<span class="my_time" id="my_time" style="color:green">'+t+' </span>')
            $(this).find("p.my_cont").prepend('<span class="my_time" id="my_time" style="color:green">'+t+' </span>')
        }
        $(this).find("img[src*='room']").css("display", "none")
    })
    setTimeout(function(){
	    clearing=false
	}, 100);
}
function add_time() {
    $(".c_cont .c_text ul").append('<p style="font-family:monaco;color:green;font-size:90%">'+Date()+"</p>")
}

function show_chat() {
    $(".c_cont .c_text li").each(function(index){message = $(this).text();console.log(index, message)});
}
console.mine=[]
console.mine.show_chat = show_chat
console.my_show_chat=show_chat

function select_zhiboxiangqing() {
    try {
		document.getElementById("live_detal").click()
    	$("div.room_nav").remove()
    }
    catch(e){
        console.log("ignore error:", e)
    }
}

add_time()
setInterval(clear_chat, 500);
document.getElementById("blackgift").click()
$("li.js_room_user a.js_r_btn").remove()
$(".b_mes_up").css("display", "none") //表情栏
//等级栏
$(".m_rank").remove()
//$(".chat_mem").css("height", 40)

select_zhiboxiangqing()

document.getElementById("chat_line_list").addEventListener("DOMSubtreeModified", function(e) {
    //console.log('modified')
    if (!clearing) {
        console.log('trigger')
    	clear_chat()
    }
    else {
        //console.log('skip')
    }
})


//////////////test
function my_sendmsg(msg) {
        var g = Date.parse(new Date()) / 1000;
        if ((g - sendtime) <= send_interval_time) {
                return false
        }
        var h = msg + ' (' + Date() + ')'
        var c = check_user_login();
        if (!c) {
                user_dialog.open_login();
                return false
        }
        var f = [{
                name: "content",
                value: scan_str(h)
        }, {
                name: "scope",
                value: $("#privatstate").val()
        }];
        var d = !c ? touristuid : c.wl_uid;
        f.push({
                name: "sender",
                value: d
        });
        if ($("#privateuid").val() > 0) {
                f.push({
                        name: "receiver",
                        value: $("#privateuid").val()
                })
        }
        var i = Sttencode(f);
        try {
            console.log("msg:", msg, "stt:", i)
        } catch (e) {}
}

