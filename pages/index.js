import Head from 'next/head';
import { getSession, useSession } from 'next-auth/client';
import { Container, Grid, Tab } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { useState } from 'react';
import useSWR from 'swr';
import Navbar from '../components/Navbar';
import StreamPreview from '../components/StreamPreview';

export default function Home(props) {
  const [ tab, setTab ] = useState('streamers');
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
        <TabContext value={tab}>
          <TabList onChange={(event, value) => setTab(value)}>
            <Tab label="Streamers" value="streamers" />
            <Tab label="Games" value="games" />
          </TabList>
          <TabPanel value="streamers">
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
          </TabPanel>
          <TabPanel value="games">
            this is a test
          </TabPanel>
        </TabContext>
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