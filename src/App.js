import "./App.css";
import { forwardRef, useEffect, useState } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import ImageCard from "./imageCard";
import { getApiResponse } from "./utils";
import Alert from "@mui/material/Alert";
import MuiAlert from "@mui/material/Alert";

const App = () => {
  const classes = useStyles();
  const [dogList, setDogList] = useState([]);
  const [sortType, setSortType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showError, setShowError] = useState(false);

  const handleChange = (event) => {
    setSortType(event.target.value);
    setShowError(false);
  };

  const callAPI = (res) => {
    setDogList(res);
  };

  useEffect(() => {
    const delayDebounceFn =
      setShowError &&
      setTimeout(() => {
        getApiResponse(sortType, searchTerm, callAPI);
      }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="App">
      <div className={classes.container}>
        <FormControl sx={{ minWidth: 220 }}>
          <InputLabel id="demo-select-small-label">Select sort type</InputLabel>
          <Select
            inputProps={{ "data-testid": "sort-type-dropdown" }}
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
          inputProps={{ "data-testid": "search-text" }}
          id="outlined-multiline-flexible"
          label="Type to Search"
          value={searchTerm}
          maxRows={1}
          onChange={(e) =>
            sortType ? setSearchTerm(e.target.value) : setShowError(true)
          }
        />
      </div>
      <ImageRow dogList={dogList} />
      {showError && (
        <Alert data-testid="show-error-alert" severity="error">
          {" "}
          Please select the sort type!
        </Alert>
      )}
    </div>
  );
};

export const ImageRow = ({ dogList }) => {
  const classes = useStyles();
  return (
    <div data-testid="image-row" className={classes.imageRow}>
      {dogList.map((dog, i) => (
        <ImageCard
          key={i}
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
