import Head from 'next/head';
import { getSession, useSession } from 'next-auth/client';
import { Container, Grid } from '@material-ui/core';
import Navbar from '../components/Navbar';
import StreamPreview from '../components/StreamPreview';
import useSWR from 'swr';

export default function Home(props) {
  const { data, error } = useSWR('/api/streams', {
    revalidateOnFocus: false
  });
  const [session] = useSession();

  if (error) {
    return <div>failed to load</div>;
  }
  if (!data) {
    return <div>loading...</div>;
  }

  const streamers = data.data;

  return (
    <div>
      <Head>
        <title>Home - PuffinPlayer</title>
      </Head>
      <Navbar />
      <Container>
        <Grid container>
          {!session && <>
            lmao
          </>}
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

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log(session);

  return {
    props: {
      session
    }
  }
}