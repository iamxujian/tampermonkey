// ==UserScript==
// @name         pandatv_chat_robot
// @namespace    https://github.com/iamxujian
// @version      0.1
// @description  auto send danmu in chat room of panda.tv
// @author       xujian<iamxujian@gmail.com>
// @include      /^http://www.panda.tv/11387$/
// @grant        none
// ==/UserScript==

'use strict';

var words = [
    [40, "卡顿就右击直播画面选择线路三", 0]
    ]

function send_msg(element) {
    console.info("msg:", element[1], "no.", element[2])
    element[2] += 1
    //var text = element[1] + ",间隔"+element[0]+"s,第" + element[2] + "次广播"
    var text = element[1] + ",间隔"+element[0]+"s广播"
    console.info("msg:", element[1], "no.", element[2], "text:", text)
    $("#chat_dispatch").val(text)
    $(".chat-send-btn").click()
}

function main() {
    for (var element of words) {
        var interval = element[0] * 1000
        console.info("interval:", interval, "word:", element)
        setInterval(send_msg, interval, element);
    }
}

main()
