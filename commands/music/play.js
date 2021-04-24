const ytdl = require("discord-ytdl-core");
const youtubeScraper = require("yt-search");
const yt = require("ytdl-core");
const { MessageEmbed, Util } = require("discord.js")
const forHumans = require("../../utils/forhumans")


module.exports = {
  name: "play",
  description: "Play some music",
  category: "play <song name | song url>",

  run: async (client , message, args) => {

const channel = message.member.voice.channel;

  
  const send = (content) => message.channel.send(content);
  const setqueue = (id, obj) => message.client.queue.set(id, obj);
  const deletequeue = (id) => message.client.queue.delete(id);
  var song;

  if (!channel) return message.reply("You must join a voice channel to play music!");

  if (!channel.permissionsFor(message.client.user).has("CONNECT"))
    return message.reply("I Dont Have The Permissions To Connect! - [CONNECT]");

  if (!channel.permissionsFor(message.client.user).has("SPEAK"))
    return message.reply("I Dont Have The Permissions Speak! - [SPEAK]");

  const query = args.join(" ");

  if (!query) return message.reply("Please provide a song name to play");

  if (query.includes("www.youtube.com")) {
    try {
      const ytdata = await await yt.getBasicInfo(query);
      if (!ytdata) return message.reply("Cannot find a song for the url provided");
      song = {
        name: Util.escapeMarkdown(ytdata.videoDetails.title),
        thumbnail:
          ytdata.player_response.videoDetails.thumbnail.thumbnails[0].url,
        requested: message.author,
        videoId: ytdata.videoDetails.videoId,
        duration: forHumans(ytdata.videoDetails.lengthSeconds),
        url: ytdata.videoDetails.video_url,
        views: ytdata.videoDetails.viewCount,
      };
    } catch (e) {
      console.log(e);
      return message.reply("Error occured, please check console");
    }
  } else {
    try {
      const fetched = await (await youtubeScraper(query)).videos;
      if (fetched.length === 0 || !fetched)
        return message.reply("Cannot find the song");
      const data = fetched[0];
      song = {
        name: Util.escapeMarkdown(data.title),
        thumbnail: data.image,
        requested: message.author,
        videoId: data.videoId,
        duration: data.duration.toString(),
        url: data.url,
        views: data.views,
      };
    } catch (err) {
      console.log(err);
      return message.reply("An error occured, Please check console");
    }
  }

  var list = message.client.queue.get(message.guild.id);

  if (list) {
    list.queue.push(song);
    return send(
      new MessageEmbed()
        .setAuthor(
          "New Song has been added to the queue",
          "https://img.icons8.com/color/2x/cd--v3.gif"
        )
        .setColor("RED")
        .setThumbnail(song.thumbnail)
        .addField("Song Name", song.name, false)
        .addField("Views", song.views, false)
        .addField("Duration", song.duration, false)
        .addField("Requested By", song.requested, false)
        .addField("Queue Position" , list.queue.length)
        .setTimestamp()
    );
  }

  const structure = {
    channel: message.channel,
    vc: channel,
    volume: 85,
    playing: true,
    queue: [],
    connection: null,
  };

  setqueue(message.guild.id, structure);
  structure.queue.push(song);

  try {
    const join = await channel.join();
    structure.connection = join;
    play(structure.queue[0]);
  } catch (e) {
    console.log(e);
    deletequeue(message.guild.id);
    return message.reply("I couldn't join the voice channel, Please check console");
  }

  async function play(track) {
    try {
      const data = message.client.queue.get(message.guild.id);
      if (!track) {
        const embed = new MessageEmbed()
        .setDescription("Queue is empty, Leaving voice channel")
        .setColor("RED")
        data.channel.send(embed)
        
        message.guild.me.voice.channel.leave();
        return deletequeue(message.guild.id);
      }
      data.connection.on("disconnect", () => deletequeue(message.guild.id));
      const source = await ytdl(track.url, {
        filter: "audioonly",
        quality: "highestaudio",
        highWaterMark: 1 << 25,
        opusEncoded: true,
      });
      const player = data.connection
        .play(source, { type: "opus" })
        .on("finish", () => {
          var removed = data.queue.shift();
          if(data.loop == true){
            data.queue.push(removed)
          }
          play(data.queue[0]);
        });
      player.setVolumeLogarithmic(data.volume / 100);
      data.channel.send(
        new MessageEmbed()
          .setAuthor(
            "Now Playing",
            "https://img.icons8.com/color/2x/cd--v3.gif"
          )
          .setColor("RED")
          .setThumbnail(track.thumbnail)
          .addField("Song Name", track.name, false)
          .addField("Views", track.views, false)
          .addField("Duration", track.duration, false)
          .addField("Requested By", track.requested, false)
          .setFooter(message.guild.name , message.guild.iconURL())
      );
    } catch (e) {
      console.error(e);
    }
  }
  }
}