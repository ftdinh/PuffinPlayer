import Head from 'next/head';
import Link from 'next/link';
import { Container, Grid } from '@material-ui/core';
import Navbar from '../components/Navbar';
import StreamPreview from '../components/StreamPreview';
import useSWR from 'swr';

export default function Home() {
  const { data, error } = useSWR('/api/streams', {
    revalidateOnFocus: false
  });

  if (error) {
    return <div>failed to load</div>;
  }
  if (!data) {
    return <div>loading...</div>;
  }

  const streamers = data.data;

  return (
    <div>
      <Navbar />
      <Container>
        <Grid container>
          {streamers.map(streamer => (
            <StreamPreview
              title={streamer.title}
              username={streamer.user_name}
              thumbnail_url={streamer.thumbnail_url}
              viewerCount={streamer.viewer_count}
            />
          ))}
        </Grid>
      </Container>
    </div>
  );
}