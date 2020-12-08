import { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Layout from '../models/layout';
import { Photo } from '../models/photo';

const useStyles = makeStyles(() => ({
  card: {
    display: "flex",
    'flex-direction': 'column'
  },
  cardRow: {
    display: "flex",
    'flex-direction': 'row'
  },
  cardMedia: {
    minHeight: 175,
    minWidth: 175
  },
  title: {
    'height': '64px',
    'max-width': '100%',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    'display': '-webkit-box',
    'overflow': 'hidden',
    'text-overflow': 'ellipsis'
  }
}));

const PhotoCard: FC<{photo: Photo, layout: Layout}> = ({ photo, layout }) => {
  const classes = useStyles();

  return (
    <Card className={layout === Layout.Grid ? classes.card: classes.cardRow}>
      {photo?.source && (
        <CardMedia
          image={photo.source}
          title="Image title"
          className={classes.cardMedia}
        />
      )}
      <CardContent>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">
          { photo.title }
        </Typography>
      </CardContent>
    </Card>
  )
}

export default PhotoCard
