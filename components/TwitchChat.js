const TwitchChat = (props) => {
  const { streamer } = props;
  const src=`https://www.twitch.tv/embed/${streamer}/chat?parent=localhost&parent=puffinplayer.herokuapp.com`;

  return (
    <div style={{height: "calc(100vh - 64px)"}}>
      <iframe
        frameBorder="0"
        scrolling="no"
        id="chat_embed"
        src={src}
        height="100%"
        width="100%">
      </iframe>
    </div>
  );
}

export default TwitchChat;