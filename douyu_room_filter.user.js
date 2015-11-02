// ==UserScript==
// @name         douyu_room_filter
// @namespace    https://github.com/iamxujian
// @version      0.1
// @description  enter something useful
// @author       xujian<iamxujian@live.com>
// @match        http://www.douyutv.com/directory*
// @grant        none
// ==/UserScript==

console.log("start douyu room filter")

blacklist = {
    "title":    [/gta/i, /lol/i, /三国战纪/,
                 /running.*man/i, /(千种死法|福利)/, /韩.*(女|腿)/, /t-?ara/i, /王大锤/, /(智妍|孝敏)/,
                 /少女时代/, /aoa/i, /代练/, /定(位|级)赛?/, /庞麦郎/,
                 /接单/],
    "author":   [/^(哀绿|安德罗妮丶|Aceymomo|中南校长|林宝宝大魔王|Amorjojo|倾城小优|漏漏|安全套不套)$/,
                 /庞麦郎/,
                 /^炉石王师傅$/, // 没意思
                 /^真虎龙王$/,   // 喷观众
                 /^二叔真疯狂$/    //声道不均匀
                ],
    "category": [/英雄联盟/, /穿越火线/, /CS:GO/, ]
}

block_amount = 1

function test(info) {
    for (target in info) {
        if (typeof info[target] === "string") {
            for (e of blacklist[target]) {
                if (e.test(info[target])) {
                    console.log("remove", info, target, "triggers", e, "block", block_amount, "rooms")
                    return true
                }
            }
        }
    }
    return false
}

function remove(b) {
    info = {
        "category": $(b).find("span.zbName").text(),
        "author": $(b).find("span.nnt").text(),
        "title": $(b).find("h1.title").text()
    }
    //info.toString = function() {return "abc";}
    if (test(info)) {
        b.remove()
        block_amount ++
    }
}

function cc() {
    console.log("clean start")
    $( "#item_data li" ).each(function( index ) {
        remove(this)
    });
    set_live_height()
    console.log("clean completed")
}

function c() {
    try {
        cc()
    }
    catch(err) {
        console.log(err)
    }
}

function remove_tag() {
    $(".nav_section .tagCont ul li").each(function(index) {
        console.log(index)
        category = $(this).find("a").text()
        console.log(category)
        for (c of blacklist["category"]) {
            console.log(c)
            if (c.test(category)) {
                $(this).remove()
                console.log("remove tag:", category, "which triggers", c)
            }
        }
        console.log("end")
    })
}

//remove_tag();
cc();

(function() {
    setInterval(c, 2000);
})();
