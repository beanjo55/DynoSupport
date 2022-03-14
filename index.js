require('dotenv').config()

const Eris = require('eris');
const bot = new Eris(process.env.TOKEN);

var fs = require('fs');
const ini = require(`ini`);
const config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));

function sendPostLog(event, userID) {
    const postLog = {
        embeds: [{
            color: config.dynoColor,
            description: `Posted ${event} \(\`${userID}\`\)`,
            footer: {
                text: "Dyno Support",
                icon_url: "https://cdn.discordapp.com/avatars/942428397999620137/dfb83a7e760d5f8dd9f9e6ae388d7970.png",
            }, 
            timestamp: new Date(),
        }]
    }
    console.log(`-Event: Posted ${event} for ${userID}`);
    bot.createMessage("944242153335427082", postLog);
}

bot.on("ready", () => {
    console.log("Status: Online");

    const onlineLog = {
        embeds: [{
            color: config.successColor,
            description: "Bot Started",
            footer: {
                text: "Dyno Support",
                icon_url: "https://cdn.discordapp.com/avatars/942428397999620137/dfb83a7e760d5f8dd9f9e6ae388d7970.png",
            },
            timestamp: new Date(),
        }]    
    }

    bot.createMessage("944242153335427082", onlineLog);

    let activities = {
        name: "#support",
        type: 3
    }
    bot.editStatus(activities);
});

bot.on("messageCreate", (msg) => {
    if(msg.content === "s.restart") { // Restart cmd
        console.log(`Status: Restarted by ${msg.author.id}`);

        const restartLog = {
            embeds: [{
                color: config.warnColor,
                description: `Bot Restarting... \(\`${msg.author.id}\`\)`,
                footer: {
                    text: "Dyno Support",
                    icon_url: "https://cdn.discordapp.com/avatars/942428397999620137/dfb83a7e760d5f8dd9f9e6ae388d7970.png",
                },
                timestamp: new Date(),
            }]
        }
        
        bot.createMessage(msg.channel.id, "Restarting.");
        bot.createMessage("944242153335427082", restartLog);
        bot.disconnect();
    }
});

bot.on("messageCreate", (msg) => {
    if(msg.content === "s.post") { // Post support menu

        let embed = {
            title: "**Welcome to Dyno Support!**",
            color: config.dynoColor,
            fields: [
                {
                    name: "Resources",
                    value: "**[Invite Dyno](https://dyno.gg/invite)\n[Dyno Dashboard](https://dyno.gg)\n[Commands List](https://wiki.dyno.gg/commands)\n[Dyno Wiki](https://wiki.dyno.gg)**",

                },
                {
                    name: "Need Help?",
                    value: "Select the module/option you need help with below.",
                },
            ]

        }

        const menu = {
            embeds: [embed],
            components: [
                {
                    type: 1,
                    components: [{
                        type: 3,
                        custom_id: "modules",
                        placeholder: "Select a module",
                        options: [
                            {
                                label: "AFK",
                                value: "afk",
                                emoji: {
                                    id: "942551220311171143",
                                    name: "afk",
                                }
                            },
                            {
                                label: "Action Log",
                                value: "actionLog",
                                emoji: {
                                    id: "942551220281831474",
                                    name: "actionLog",
                                }
                            },
                            {
                                label: "Announcements",
                                value: "announcements",
                                emoji: {
                                    id: "942551220344745994",
                                    name: "announcements",
                                }
                            },
                            {
                                label: "Auto Delete",
                                value: "autoDelete",
                                emoji: {
                                    id: "942551220327948388",
                                    name: "autoDelete",
                                }
                            },
                            {
                                label: "Auto Message",
                                value: "autoMsg",
                                emoji: {
                                    id: "942551220323762196",
                                    name: "autoMsg",
                                }
                            },
                            {
                                label: "Auto Purge",
                                value: "autoPurge",
                                emoji: {
                                    id: "942551220013375549",
                                    name: "autoPurge",
                                }
                            },
                            {
                                label: "Autoban",
                                value: "autoban",
                                emoji: {
                                    id: "942551220361519104",
                                    name: "autoban",
                                }
                            },
                            {
                                label: "Automod",
                                value: "automod",
                                emoji: {
                                    id: "942551220357308416",
                                    name: "automod",
                                }
                            },
                            {
                                label: "Autoresponder",
                                value: "autoresponder",
                                emoji: {
                                    id: "942551220202119189",
                                    name: "autoresponder",
                                }
                            },
                            {
                                label: "Autoroles",
                                value: "autoroles",
                                emoji: {
                                    id: "942551220411826256",
                                    name: "autoroles",
                                }
                            },
                            {
                                label: "Custom Commands",
                                value: "cc",
                                emoji: {
                                    id: "942551220327948389",
                                    name: "cc",
                                }
                            },
                            {
                                label: "Forms",
                                value: "forms",
                                emoji: {
                                    id: "942551220059537529",
                                    name: "forms",
                                }
                            },
                            {
                                label: "Fun",
                                value: "fun",
                                emoji: {
                                    id: "942551220135026761",
                                    name: "fun",
                                }
                            },
                            {
                                label: "Giveaways",
                                value: "giveaways",
                                emoji: {
                                    id: "942551221191999548",
                                    name: "giveaways",
                                }
                            },
                            {
                                label: "Message Embedder",
                                value: "msgEmbedder",
                                emoji: {
                                    id: "942551220487335986",
                                    name: "msgEmbedder",
                                }
                            },
                            {
                                label: "Moderation",
                                value: "moderation",
                                emoji: {
                                    id: "942551220529270804",
                                    name: "moderation",
                                }
                            },
                            {
                                label: "Reaction Roles",
                                value: "rr",
                                emoji: {
                                    id: "942551220659318804",
                                    name: "rr",
                                }
                            },
                            {
                                label: "Reddit",
                                value: "reddit",
                                emoji: {
                                    id: "942551220432818237",
                                    name: "reddit",
                                }
                            },
                            {
                                label: "Reminders",
                                value: "reminders",
                                emoji: {
                                    id: "942551220596404264",
                                    name: "reminders",
                                }
                            },
                            {
                                label: "Slowmode",
                                value: "slowmode",
                                emoji: {
                                    id: "942551220567019540",
                                    name: "slowmode",
                                }
                            },
                            {
                                label: "Starboard",
                                value: "starboard",
                                emoji: {
                                    id: "942551220919369739",
                                    name: "starboard",
                                }
                            },
                            {
                                label: "Tags",
                                value: "tags",
                                emoji: {
                                    id: "942551220332134471",
                                    name: "tags",
                                }
                            },
                            {
                                label: "Twitch",
                                value: "twitch",
                                emoji: {
                                    id: "942551220655128576",
                                    name: "twitch",
                                }
                            },
                            {
                                label: "Voice Text Linking",
                                value: "vtl",
                                emoji: {
                                    id: "942551221250707546",
                                    name: "vtl",
                                }
                            },
                            {
                                label: "Welcome",
                                value: "welcome",
                                emoji: {
                                    id: "942551220504125451",
                                    name: "welcome",
                                }
                            },
                        ]
                    }]        
                },
                {
                    type: 1,
                    components: [{
                        type: 3,
                        custom_id: "options",
                        placeholder: "Select an option",
                        options: [
                            {
                                label: "Commands",
                                value: "commands",
                            },
                            {
                                label: "Premium/Payment",
                                value: "premium",
                            },
                            {
                                label: "Dashboard",
                                value: "dashboard",
                            },
                            {
                                label: "Report a User",
                                value: "report",
                            },
                            {
                                label: "Security Issue",
                                value: "security",
                            },
                            
                        ]

                    }
                    ]
                }
            ]
        }

        bot.createMessage("942433488395730994", menu);
        sendPostLog("supportMenu", msg.author.id);
        msg.delete();
    }
});

// Button/dropdown selected
bot.on("interactionCreate", async (interaction) => {
    if(!interaction || !interaction.data) return;

    if(interaction.data.custom_id === "restart" && interaction.member.id === config.botOwnerID) { // Restart button
        console.log(`Status: Restarted by ${interaction.member.id}`);

        const restartLog = {
            embeds: [{
                color: config.warnColor,
                description: `Bot Restarting... \(\`${interaction.member.id}\`\)`,
                footer: {
                    text: "Dyno Support",
                    icon_url: "https://cdn.discordapp.com/avatars/942428397999620137/dfb83a7e760d5f8dd9f9e6ae388d7970.png",
                },
                timestamp: new Date(),
            }]
        }
        const msg = {
            content: "Restarting...",
            flags: 64,
        }
        
        interaction.createMessage(msg)
        bot.createMessage("944242153335427082", restartLog);
        bot.disconnect();
    }

    else if(interaction.data.custom_id === "addSup") {
        if(interaction.member.roles.includes(config.premiumRoleID)) {
            const redirectMsg = {
                embeds: [{
                    color: config.errorColor,
                    description: `Head to ${bot.getChannel(config.premiumChannelID).mention} or ${bot.getChannel(config.supportChannelID).mention} and ask your question or state your problem in detail and a Support Team member will assist you soon.`,
                }],
                flags: 64,
            }
            interaction.createMessage(redirectMsg);
            sendPostLog("addSup [PREM]", interaction.member.id);
        }
        else {
            const redirectMsg = {
                embeds: [{
                    color: config.errorColor,
                    description: `Head to ${bot.getChannel(config.supportChannelID).mention} and ask your question or state your problem in detail and a Support Team member will assist you soon.`,
                }],
                flags: 64,
            }

            interaction.member.addRole(config.addSupRoleID,"Additional Support button clicked");
            interaction.createMessage(redirectMsg);
            bot.createMessage(config.supportChannelID, `${interaction.member.mention} needs additional support. Please ask your question or state your issue in detail and a Support Team member will assist you soon.`);
            sendPostLog("addSup", interaction.member.id);
        }
    }

    else if(interaction.data.custom_id === "modules") { // Module dropdown selected

        /* if (interaction.data.values[0] === "afk") {

        } */ 

        if (interaction.data.values[0] === "actionLog") {

            const actionLogMenu = {
                embeds: [{
                    title: "Action Log",
                    color: config.dynoColor,
                    description: ":one: How do I set up Action Log?\n:two: Some/all Action Log events are not posting.",
                }],
                flags: 64,
                components: [{
                    type: 1,
                    components: [
                        {
                            type: 2,
                            custom_id: "actionLog_setup",
                            style: 1,
                            emoji: {
                                id: null,
                                name: "1️⃣",
                            },
                        },
                        {
                            type: 2,
                            custom_id: "actionLog_notWorking",
                            style: 1,
                            emoji: {
                                id: null,
                                name: "2️⃣",
                            },
                        },
                        {
                            type: 2,
                            style: 5,
                            label: "Action Log Wiki",
                            url: "https://wiki.dyno.gg/modules/actionlog",

                        },
                        {
                            type: 2,
                            custom_id: "addSup",
                            style: 4,
                            label: "Additional Support",
                        },
                    ]
                }]
            }

            interaction.createMessage(actionLogMenu);
            sendPostLog("actionLogMenu", interaction.member.id);
        }
    }

    else if(interaction.data.custom_id === "options") {

        if(interaction.data.values[0] === "report") {
            const report = {
                embeds: [{
                    color: config.errorColor,
                    description: "Please DM <@!174603896990203905> to submit a report.",
                }],
                flags: 64,
            }

            interaction.createMessage(report);
            sendPostLog("report", interaction.member.id);
        }
    }

    // Individual module option selected

    // Action Log
    else if(interaction.data.custom_id === "actionLog_setup") {
        const actionLog_setup_menu = {
            embeds: [{
                color: config.dynoColor,
                description: "**How 2 Action Log**\n\`1.\` Head to <https://www.dyno.gg/>, login, and select your server.\n\`2.\` Click on the \`Modules\` tab.\n\`3.\` Ensure that the \`Action Log\` module is enabled.\n\`4.\` Click the \`Settings\` button underneath the Action Log module.\n\`5.\` Enable \`Specify Channels for Each Event\` if you wish to choose a specific channel for each log event.\n\`6.\` Enable the events you want or set a channel for them if you selected the \`Specify Channels\` option.\n\`7.\` Select any channels you want to be ignored. Dyno will not log any events for these channels. You can also select categories.\n\`8.\` Select any roles you want to be ignored. Deleted messages sent by these roles will not be logged.\n\`~~\` **For more detailed information, check out <https://wiki.dyno.gg/en/modules/actionlog>!**\n\n**Note:** If Dyno does not have the \`Administrator\` permission, make sure Dyno has these permissions in your log channel on Discord:\n <:dynoSuccess:696561641227288639> \`Manage Webhooks\`\n <:dynoSuccess:696561641227288639> \`View Channel\`\n <:dynoSuccess:696561641227288639> \`Send Messages\`\n <:dynoSuccess:696561641227288639> \`Embed Links\`",
            }],
            flags: 64,
            components: [{
                type: 1,
                components: [{
                    type: 2,
                    custom_id: "addSup",
                    style: 4,
                    label: "Additional Support",
                        
                }],
            }],
        }

        interaction.createMessage(actionLog_setup_menu);
        sendPostLog("actionLog_setup", interaction.member.id);
    }

    else if(interaction.data.custom_id === "actionLog_notWorking") {
        const actionLog_notWorking_menu = {
            embeds: [{
                color: config.dynoColor,
                description: "Insert troubleshooting steps here",
            }],
            flags: 64,
            components: [{
                type: 1,
                components: [{
                    type: 2,
                    custom_id: "addSup",
                    style: 4,
                    label: "Additional Support",
                        
                }],
            }],
        }
    }

});

bot.connect();