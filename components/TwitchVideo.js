import Head from 'next/head';
import { useEffect } from 'react';

const TwitchVideo = (props) => {
  useEffect(() => {
    var embed = new Twitch.Embed("twitch-embed", {
      width: "100%",
      height: "100%",
      channel: props.streamer,
      layout: "video",
      autoplay: false,
      parent: ["puffinplayer.herokuapp.com"]
    });

    embed.addEventListener(Twitch.Embed.VIDEO_READY, () => {
      var player = embed.getPlayer();
      player.play();
    });
  }, []);

  return (
    <div>
      <Head>
        <script src="https://embed.twitch.tv/embed/v1.js"></script>
      </Head>
      <div id="twitch-embed" style={{height: "100vh"}}></div>
    </div>
  );
}

export default TwitchVideo;