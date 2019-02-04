const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

    let helplist = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription("這裡可以讓你知道這隻機器人的**所有**資訊，但是請勿**濫用**指令來刷頻\n某些指令我們已經做了權限控制\n")
        .setAuthor(bot.user.username, bot.user.avatarURL)
        .setFooter(bot.user.username, bot.user.avatarURL)
        .setTitle("指令列表")
        .addField('• 指令', "```py\n1# muhc/help\n2# muhc/ping \n3# muhc/ascii\n4# muhc/purge\n5# muhc/test```",true )
        .addField('• 說明', "```fix\n開啟此列表\n查詢延遲\n藝術文字 (Admin)\n大量刪除訊息 (Admin)\n測試用指令```",true )
        .addField('• 建議', "(Admin) 代表需要Admin權限\n如果有任何有關於指令的建議，像是想要新增指令或是功能\n還歡迎聯絡 ***微苦#3402***\n我會很樂意為你服務的\n[MUHCYoutube](https://muhc.tw/yt) | [MUHCDiscord](https://muhc.tw/dc) | [MUHCWebsite]( https://muhc.tw) | [MUHCBotInvite](https://muhc.tw/bot)\n如果可以的話請把Bot邀請到你的Discord群 你的支持是我們的動力" )
        .addField('• 即時狀態',"\`\`\`js\n如果需要此機器人的即時狀態\n請在你的群組創建一個名為\"kizinn-info\"的頻道\n機器人將會在下一次啟動時載入資料`\`\`")
        .setTimestamp(new Date())
        .setFooter(`${message.author.tag}`);

        
    return message.channel.send(helplist);
        

}

module.exports.help = {
    name: "help",
}