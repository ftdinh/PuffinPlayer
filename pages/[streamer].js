import Head from 'next/head';
import { Grid } from '@material-ui/core';
import Navbar from '../components/Navbar';
import TwitchVideo from '../components/TwitchVideo';
import TwitchChat from '../components/TwitchChat';

const Streamer = (props) => {
  const streamer = props.params.streamer;

  return (
    <>
      <Head>
        <title>{streamer}</title>
      </Head>
      <Navbar />
      <Grid container>
        <Grid item xs={9}>
          <TwitchVideo streamer={streamer} />
        </Grid>
        <Grid item xs={3}>
          <TwitchChat streamer={streamer} />
        </Grid>
      </Grid>
    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      params: context.params
    }
  }
}

export default Streamer;