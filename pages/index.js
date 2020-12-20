import Head from 'next/head';
import { getSession, useSession } from 'next-auth/client';
import { Container, Grid, Tab } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { useState } from 'react';
import useSWR from 'swr';
import Navbar from '../components/Navbar';
import StreamPreview from '../components/StreamPreview';

function useFollowing(id) {
  const { data, error } = useSWR(`/api/users/follows?from_id=${id}`, {
    revalidateOnFocus: false
  });
  return {
    following: data,
    isLoading: !error & !data,
    isError: error
  }
}

function useLiveFollowing(userIds) {
  const followingQuery = userIds ? userIds.join('&user_id=') : null;
  const { data, error } = useSWR(`/api/streams?user_id=${followingQuery}`, {
    revalidateOnFocus: false
  });
  return {
    liveFollowing: data,
    isLoading: !error & !data,
    isError: error
  }
}

export default function Home(props) {
  const [ tab, setTab ] = useState('Streamers');
  const { data, error } = useSWR('/api/streams', {
    revalidateOnFocus: false
  });
  const [ session ] = useSession();
  const { following } = useFollowing(props.userId);
  const followingIds = following ? following.data.map(relation => relation.to_id) : null;
  const { liveFollowing } = useLiveFollowing(followingIds);

  console.log(liveFollowing);

  if (error) {
    return <div>failed to load</div>;
  }
  if (!data) {
    return <div>loading...</div>;
  }

  const tabs = session ? ["Following", "Streamers", "Games"] : ["Streamers", "Games"];

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
            {tabs.map(tab => <Tab label={tab} value={tab} />)}
          </TabList>
          <TabPanel value="Following">
            <Grid container>
              {liveFollowing && liveFollowing.data.map(streamer => (
                <StreamPreview
                  title={streamer.title}
                  username={streamer.user_name}
                  thumbnail_url={streamer.thumbnail_url}
                  viewerCount={streamer.viewer_count}
                />
              ))}
            </Grid>
          </TabPanel>
          <TabPanel value="Streamers">
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
          <TabPanel value="Games">
            this is a test
          </TabPanel>
        </TabContext>
      </Container>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      userId: session && session.id
    }
  }
}