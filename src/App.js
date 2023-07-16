import "./App.css";
import { useEffect } from "react";
import  axios  from "axios";



const API_KEY =
  "live_PWxXT2dwdr9bZZ4VIExRyiGQwlxHY00k5TtF0E1SQHmfmi7H2pv8LXwH0DpdAXMy";

const App = () => {
const getApiResponse = ()=>{
  axios.get(`https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=${API_KEY}`)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
}
  useEffect(() => {
    getApiResponse()
  }, []);

  return <div className="App"></div>;
};

export default App;
