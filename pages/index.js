import Head from 'next/head';
import Link from 'next/link';
import { Container, Grid } from '@material-ui/core';
import Navbar from '../components/Navbar';
import useSWR from 'swr';

export default function Home() {
  const { data, error } = useSWR('/api/streams');

  if (error) {
    return <div>failed to load</div>;
  }
  if (!data) {
    return <div>loading...</div>;
  }

  const image = s => s.replace('{width}', '320').replace('{height}', '180');
  const streamers = data.data;

  return (
    <div>
      <Navbar />
      <Container>
        <Grid container>
          {streamers.map(streamer => (
            <img src={image(streamer.thumbnail_url)}  />
          ))}
        </Grid>
      </Container>
    </div>
  );
}