
import { makeStyles } from '@mui/styles';
import frock from '../../assets/card-images/frock.webp';
import bibotop from '../../assets/card-images/bibatop.webp';
import shirt from '../../assets/card-images/shirt.webp';
import shoes from '../../assets/card-images/shoes.webp';
import { Grid } from '@mui/material';

const useStyles = makeStyles(() => ({
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 15,
    background:'#f8f8f8',
    padding:'30px',
    overflowX: 'auto', 
    '-webkit-overflow-scrolling': 'touch',
    '@media (min-width: 600px)': {
      gridTemplateColumns: 'repeat(4, 1fr)', 
    },
  },
  card: {
    overflow: 'hidden',
    borderRadius: 10,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',

    transition: 'opacity 0.3s ease-in-out',
  
  },
}));

const Cards = () => {
  const classes = useStyles();
  return (
    <Grid className={classes.cardContainer}>
      <Grid className={classes.card}>
        <img src={frock} alt="Frock" className={classes.cardImage} />
      </Grid>
      <Grid className={classes.card}>
        <img src={bibotop} alt="Bibotop" className={classes.cardImage} />
      </Grid>
      <Grid className={classes.card}>
        <img src={shirt} alt="Shirt" className={classes.cardImage} />
      </Grid>
      <Grid className={classes.card}>
        <img src={shoes} alt="Shoes" className={classes.cardImage} />
      </Grid>
     
    </Grid>
  );
};

export default Cards;
