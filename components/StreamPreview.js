import { 
         Card,
         CardActionArea,
         CardContent,
         CardMedia,
         Grid,
         Typography
       } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

const StreamPreview = (props) => {
  const resize = s => s.replace('{width}', '320').replace('{height}', '180');

  return (
    <Card>
      <CardActionArea href={props.username}>
        <CardMedia>
          <img src={resize(props.thumbnail_url)} />
        </CardMedia>
        <CardContent>
          <Grid container justify="space-between">
            <Grid item>
              <Typography>{props.username}</Typography>
            </Grid>
            <Grid item>
              <Grid container>
                <PersonIcon />
                <Typography>{props.viewerCount}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default StreamPreview;