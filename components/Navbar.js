import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';
import { 
         Button,
         AppBar,
         InputBase,
         Toolbar,
         Typography
       } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  search: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    }
  },
  searchIcon: {
    position: 'absolute'
  },
  inputRoot: {

  },
  inputInput: {

  }
}));

const Navbar = () => {
  const [session, loading] = useSession();
  const classes = useStyles();

  const BASE_URL = 'https://id.twitch.tv/oauth2/authorize';
  const CLIENT_ID = '1aifbr96mh1loogwn11nwz3ob6gcns';
  const REDIRECT_URI = process.env.NODE_ENV === 'development' ?
    'http://localhost:3000' :
    'https://puffinplayer.herokuapp.com';

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Link href="/">
          <a>
            <Typography variant="h6">
              StreamPlayer
            </Typography>
          </a>
        </Link>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search..."
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
          />
        </div>

        {!session && <>
          <Button color="inherit" onClick={signIn}>Login</Button>
        </>}

        {session && <> 
          <Button color="inherit" onClick={signOut}>Logout</Button>
        </>}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;