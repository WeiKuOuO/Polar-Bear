
const Discord = require('discord.js');
const fs = require("fs");
const request = require('request');

const token = process.env.token
const prefix = process.env.prefix

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

let index = 0;

bot.on('ready', function() {
  const statuslist = [
      //`muhc/help | 任何問題請WeiKu#3402 ♪`,
      `機器人製作 | 微苦 ♪`,
  ];
  bot.setInterval(() => {
    bot.user.setActivity(statuslist[index], { type: "STREAMING", url: "https://www.twitch.tv/weikuouo"});
    index++
    if (index === statuslist.length) index = 0;
}, 3000)
});

bot.on('message', async message => {
  if (message.author.bot) return
  if (message.channel.id == "541999708202205194") {
    if (message.content === "verify") {
      if (message.member.roles.has("541992295352893450")) {
          message.channel.send("你已經同意了").then(message => message.delete(5000))
          message.delete()
      } else {
          message.member.addRole('541992295352893450').then(message.channel.send("已成功驗證").then(message => message.delete(5000)))
          message.delete()
      }
    } else {
      message.channel.send("請輸入\"verify\"").then(message => message.delete(5000));
      message.delete()
    }
  }
}) 

const ip = "play.arcticrealm-mc.club"
const urlMain = "https://mcapi.us/server/status?ip=" + (ip);

bot.on("ready", async () => {
  bot.channels.get('542000355307945997').bulkDelete('50')
  const serverstatus = new Discord.RichEmbed()
    .setColor("RANDOM")
    .addField(":level_slider: 開關狀態:","偵測中", true)
    .addField(":boy: 在線人數:","偵測中", true)
  const m = await bot.channels.get('542000355307945997').send(serverstatus)
      
  setInterval(function(){
    request(urlMain, function(err, response, body) {
      body = JSON.parse(body);
      var status = ':lock: 維護中 ';
      var member = "伺服器關閉";
      if(body.online) {
          status = ':unlock: 運行中 ';
          if(body.players.now) {
              member = body.players.now + " / " + body.players.max ;
          } else {
              member = "0 / " + body.players.max ;
          } 
      }
      const serverinfo = new Discord.RichEmbed()
        .setColor("RANDOM")
        .addField(":level_slider: 開關狀態:",(status), true)
        .addField(":boy: 在線人數:",`${member}\n\n**play.arcticrealm-mc.club**`, true)
      m.edit(serverinfo)
    });
  },2200)
})

fs.readdir("./commands/", (err,files) => {
  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("找不到任何指令");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} 載入成功!`)
    bot.commands.set(props.help.name, props);
  })
})

bot.on("message", async message => {

  //command handler
	if (message.author.bot || message.channel.type === 'dm') return;
	if (message.content.toLowerCase().indexOf(prefix) !== 0) return
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
	try{
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(bot, message, args);
	}catch(err){
		message.reply(`未知指令! 請輸入 **${prefix}help** 查看指令列表`)
  }
  if(message.author.bot) return;
  if(message.content.indexOf(prefix) !== 0) return;

  if(command === "join"){
    message.delete().catch(O_o=>{});
    const joinmessage = new Discord.RichEmbed()
        .setAuthor(bot.user.username)
        .setThumbnail(bot.user.avatarURL)
        .setTitle("加入須知")
        .setDescription("歡迎來到北極境地Discord群組\n希望大家可以多多交流")
        .setColor(0x00FF04)
        .addField("如何加入?",`\`\`\`xl\n只需打上!join驗證，為了確保我們的玩家都不是機器人\`\`\`` , true)
  
    bot.channels.filter(c => c.name === "加入驗證").forEach(c => c.send(joinmessage));
  }
  
})


bot.on("guildCreate", guild => {
  console.log(`加入群組 ${guild.name} [ ${guild.memberCount} ](id: ${guild.id})`);
});

bot.on("guildDelete", guild => {
  console.log(`退出群組 ${guild.name} [ ${guild.memberCount} ] (id: ${guild.id})`);
});

bot.on("ready", () => {
  console.log(`${bot.user.username}成功啟動了!^w^, [ ${bot.guilds.size} | ${bot.channels.size} | ${bot.users.size} ]`);
  bot.user.setActivity(`我正在 ${bot.guilds.size} 個群組潛水`,'https://www.twitch.tv/weikuouo');
});


bot.login(token);
