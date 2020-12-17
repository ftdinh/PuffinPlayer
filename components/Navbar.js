import Link from 'next/link';
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
  const classes = useStyles();

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
        <Button color="inherit">
          <a href="https://id.twitch.tv/oauth2/authorize?client_id=1aifbr96mh1loogwn11nwz3ob6gcns&redirect_uri=http://localhost:3000&response_type=token&scope=user:edit">
            Login
          </a>
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;