import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import ImageCard from "./imageCard";
import { searchByName } from "./utils";

const API_KEY =
  "live_PWxXT2dwdr9bZZ4VIExRyiGQwlxHY00k5TtF0E1SQHmfmi7H2pv8LXwH0DpdAXMy";

const App = () => {
  const classes = useStyles();
  const [dogList, setDogList] = useState([]);
  const [sortType, setSortType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSortType(event.target.value);
  };

  const getApiResponse = () => {
    axios
      .get(`https://api.thedogapi.com/v1/images/search?limit=20`, {
        headers: {
          "x-api-key": API_KEY,
        },
      })
      .then(function (response) {
        const formattedList = dataMapper(response.data);
        sortType === "name" && setDogList(searchByName(formattedList, searchTerm));
        sortType === "height" && setDogList(searchByName(formattedList, searchTerm));
        sortType === "lifespan" && setDogList(searchByName(formattedList, searchTerm));
        console.log("response", formattedList);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const dataMapper = (dataset) => {
    const dogList = [];
    dataset.forEach((item) => {
      const temp = {};
      if (item.breeds?.length > 0) {
        temp.name = item.breeds[0].name;
        temp.height = item.breeds[0].height;
        temp.weight = item.breeds[0].weight;
        temp.lifeSpan = item.breeds[0].life_span;
        temp.bredFor = item.breeds[0].bred_for;
        temp.breedGroup = item.breeds[0].breed_group;
        temp.temperament = item.breeds[0].temperament;
        temp.imageUrl = item.url;
        dogList.push(temp);
      }
    });
    return dogList;
  };

  useEffect(() => {
    const delayDebounceFn =
      searchTerm &&
      setTimeout(() => {
        getApiResponse();
      }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="App">
      <div className={classes.container}>
        <FormControl sx={{ minWidth: 220 }}>
          <InputLabel id="demo-select-small-label">Select sort type</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={sortType}
            label="Select sort type"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>-Select sort type-</em>
            </MenuItem>
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="height">Height</MenuItem>
            <MenuItem value="lifespan">Life span</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="outlined-multiline-flexible"
          label="Type to Search"
          maxRows={1}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className={classes.imageRow}>
        {dogList.map((dog) => (
          <ImageCard
            name={dog.name}
            height={dog.height}
            weight={dog.weight}
            lifeSpan={dog.lifeSpan}
            bredFor={dog.bredFor}
            breedGroup={dog.breedGroup}
            temperament={dog.temperament}
            imageUrl={dog.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  App: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
  },
  container: {
    margin: 20,
    display: "flex",
    flexDirection: "row",
    flex: 1,
  },
  imageRow: {
    gap: 10,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
}));

export default App;
