import { Grid } from '@material-ui/core';
import StreamPreview from './StreamPreview';

const StreamPreviews = (props) => {
  const { streams } = props;

  return (
    <Grid container>
      {streams.map(stream => (
        <StreamPreview
          title={stream.title}
          username={stream.user_name}
          thumbnail_url={stream.thumbnail_url}
          viewerCount={stream.viewer_count}
        />
      ))}
    </Grid>
  );
}

export default StreamPreviews;