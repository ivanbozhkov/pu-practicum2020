import './App.css';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import photosRepository from './repositories/photosRepository';
import Layout from './models/layout';
import { Photo } from './models/photo';
import PhotoCard from './components/PhotoCard';
import { Button, CssBaseline, LinearProgress, Container, TextField, Grid } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AppsIcon from '@material-ui/icons/Apps';
import ListIcon from '@material-ui/icons/List';

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    'padding-top': theme.spacing(8),
    'padding-bottom': theme.spacing(8),
  },
  cardGrid: {
    'display': 'grid',
    'grid-template-columns': 'repeat(auto-fill,minmax(200px,1fr))',
    'grid-auto-rows': '1fr',
    'grid-column-gap': '32px',
    'grid-row-gap': '32px',
  },
  cardRow: {
    'display': 'grid',
    'grid-template-columns': '1fr',
    'grid-auto-rows': '1fr',
    'grid-column-gap': '32px',
    'grid-row-gap': '32px',
  },
  flexContainer: {
    'display': 'flex',
    'column-gap': theme.spacing(1),
    'padding-top': theme.spacing(4),
    'padding-bottom': theme.spacing(4),
  },
  flex: {
    flex: 1,
  },
  search: {
    width: '100%',
    flex: 1,
  }
}));

function App() {
  const [ photos, setPhotos ] = useState<Array<Photo>>([]);
  const [ query, setQuery ] = useState<string>('');
  const [ fetching, setFetching ] = useState<boolean>(false);
  const [ layout, setLayout ] = useState<number>(Layout.Grid);

  const classes = useStyles();
  const defaultQueries = ["hamster", "cat", "dog", "giraffe"];

  const search = (query: string) => {
    if (!fetching) {
      setFetching(true)

      photosRepository
        .getPhotosWithURLs(query)
        .then(({ photo }) => setPhotos(photo))
        .finally(() => {
          setFetching(false)
        })  
    }
  }

  useEffect(() => {
    search(defaultQueries[0])
  }, [])

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Container className={classes.cardContainer} maxWidth="md">
          <div className={classes.flexContainer}>
            <TextField
              className={classes.search}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              label="Query..."
              variant="outlined"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => search(query)}
            >
              <SearchIcon />
            </Button>
          </div>
          { fetching && (<LinearProgress />)}
          <div className={classes.flexContainer}>
            {defaultQueries.map((q) => (
              <Button key={q} onClick={() => search(q)}>{ q }</Button>
            ))}
            <div className={classes.flex}></div>
            <Button
              color="secondary"
              onClick={() => setLayout(layout === Layout.Grid ? Layout.Rows : Layout.Grid)}
            >
              {
                layout === Layout.Grid ? (<ListIcon />) : (<AppsIcon />)
              }
            </Button>
          </div>
          <div className={layout === Layout.Grid ? classes.cardGrid: classes.cardRow}>
            {photos.map((photo) => (
              <PhotoCard key={ photo.id } photo={ photo } layout={ layout } />
            ))}
          </div>
        </Container>
      </main>
    </React.Fragment>
  );
}

export default App;
