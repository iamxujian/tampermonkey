// ==UserScript==
// @name         pandatv_chat_filter
// @namespace    https://github.com/iamxujian
// @version      1.0
// @description  filter for chat column in panda.tv
// @author       xujian<iamxujian@gmail.com>
// @include      /^http://www.panda.tv/[^/]+$/
// @grant        none
// ==/UserScript==


console.log("start pandatv chat filter")

blacklist_username = [
    // system info
    /^.*?(系统提示)?.*?欢迎.*?来到.*?的直播间$/,
    // /^ 现在将不会看到其他玩家礼物赠送记录$/,
    // /^  .*?赠送给主播100个鱼丸$/,
    
    //色情 & 诈骗
    /^[^:]+?:↖[^)]+↗/,
    
    //日番组喷子
    /^emsky:/  //刷拼2B
    
]
blacklist_content = [
    /^23{2,}$/,
    /^[^:]+?:(.)\1{3,}$/,
    /^\s*$/
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
        //console.info('11111111111111111111111111111111111111111111111111111111111111111111111111111111111')
        //console.info('skip clear')
        return
    }
    clearing=true
    var time=new Date()
    //console.info('start clean')
    //t=time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
    //t=time.Format("yyyy-MM-dd hh:mm:ss");
    t=time.Format("hh:mm:ss");
    $(".chat-content-container li").each(function(index) {
        username = $(this).find("span.chat-user-name")
        content = username.next().text()
        username = username.text().slice(0,-1)
        // add time
        if ($(this).find("span#my_time").length===0 && username != "") {
            $(this).find(".chat-content-item").prepend('<span class="my_time" id="my_time" style="color:green">'+t+' </span>')
            //$(this).find("p.my_cont").prepend('<span class="my_time" id="my_time" style="color:green">'+t+' </span>')
            
            console.info(t, "user >>"+username+"<<, content >>"+content+"<<")

            for (b of blacklist_username) {
                if (b.test(username)) {
                    $(this).remove()
                    console.warn("remove user:", username, " content:", content, "by username:", b);
                    return;
                };
            }
            for (b of blacklist_content) {
                if (b.test(content)) {
                    $(this).remove()
                    console.warn("remove user:", username, " content:", content, "by content:", b);
                    return;
                };
            }
            //删除房管标记
            $(this).find("b.icon-manager-icon").css("display", "none")
            $(this).find("span.chat-tags").css("display", "none")
            $(this).find("i").css("display", "none")
        }
    })
    setTimeout(function(){
	    clearing=false
	}, 100);
}
function add_time() {
    $(".chat-content-container").append('<p style="font-family:monaco;color:green;font-size:90%">'+Date()+"</p>")
}

function show_chat() {
    $(".chat-content-container li").each(function(index){message = $(this).text();console.info(index, message)});
}

function do_not_show_present() {
    $(".chat-tool-btn-gift").click()
    console.warn("HERE")
    
    // 移除送礼物
    $("li.gift-list-item").css("display", "none")
    // 移除充值
    $("div.user-money-container").css("display", "none")
    // 移除送礼物
    $("div#rare_gift_container").css("display", "none")
}
console.mine=[]
console.mine.show_chat = show_chat
console.mine.my_show_chat = show_chat
console.mine.my_clear_chat = clear_chat

add_time()
setInterval(clear_chat, 1300);
window.setTimeout(do_not_show_present, 5000)
