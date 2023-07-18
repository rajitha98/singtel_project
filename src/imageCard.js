import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const ImageCard = (props) => {
  const {
    name,
    height,
    weight,
    lifeSpan,
    bredFor,
    breedGroup,
    temperament,
    imageUrl,
  } = props;
  return (
    <Card sx={{ maxWidth: 200 }}>
      <CardActionArea>
        {imageUrl && (
          <CardMedia
            component="img"
            height="140"
            image={imageUrl}
            alt="green iguana"
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name} - {breedGroup}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Life Span : {lifeSpan} <br />
            Height : {height?.imperial}
            <br />
            Weight : {weight?.imperial}
            <br />
            Bred for : {bredFor}
            <br />
            temperament: {temperament}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default ImageCard;
