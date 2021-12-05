import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import "./Card.css";
import attendant from "./images/covid.webp";
import passenger from "./images/Flexible-travel.webp"
import home from "./images/home.webp"
export default function CardTab() {
  return (
      <div className ="tabContainer">
           <Card sx={{ maxWidth: 400 }}>
      <CardActionArea href="/searchflight">
        <CardMedia
          component="img"
          height="400"
          image={attendant}
          alt="attendant"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          COVID-19 travel hub
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Travel information and quarantine regulations, and what to do if your trip has been impacted by COVID-19.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    <Card sx={{ maxWidth: 400 }}>
      <CardActionArea href="/searchflight">
        <CardMedia
          component="img"
          height="400"
          image={passenger}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          Flexible travel for the future
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Book now for freedom to change your travel plans if you need to.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card> <Card sx={{ maxWidth: 400 }}>
      <CardActionArea href="/searchflight">
        <CardMedia
          component="img"
          height="400"
          image={home}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          10% off Home check-in
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Enter promo code EYWINTER10 and save 10% on all Home check-in packages 
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
      </div>
  );
}