import axios from "axios";

export const searchByName = (formattedList, searchTerm) => {
  const filteredData = formattedList.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return filteredData;
};

export const searchByHeight = (formattedList, searchTerm) => {
  const filteredData = formattedList.filter((item) => {
    const h = item.height.imperial.split("-");
    const h1 = parseInt(h?.[0]);
    const h2 = parseInt(h?.[1]);
    if (searchTerm >= h1 && searchTerm <= h2) return item;
  });
  return filteredData;
};

export const searchByLifeSpan = (formattedList, searchTerm) => {
  const filteredData = formattedList.filter((item) => {
    const h = item.lifeSpan.split(" ");
    const h1 = parseInt(h?.[0]);
    const h2 = parseInt(h?.[2]);
    if (searchTerm >= h1 && searchTerm <= h2) return item;
  });
  return filteredData;
};

export const dataMapper = (dataset = []) => {
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

export const getApiResponse = (sortType, searchTerm, callBack) => {
  const API_KEY =
    "live_PWxXT2dwdr9bZZ4VIExRyiGQwlxHY00k5TtF0E1SQHmfmi7H2pv8LXwH0DpdAXMy";
  axios
    .get(`https://api.thedogapi.com/v1/images/search?limit=20`, {
      headers: {
        "x-api-key": API_KEY,
      },
    })
    .then(function (response) {
      const formattedList = dataMapper(response?.data);
      sortType === "name" && callBack(searchByName(formattedList, searchTerm));
      sortType === "height" &&
        callBack(searchByHeight(formattedList, searchTerm));
      sortType === "lifespan" &&
        callBack(searchByLifeSpan(formattedList, searchTerm));
    });
};
