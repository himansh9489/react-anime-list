import { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";

function App() {
  const [animeList, SetAnimeList] = useState([]);
  const [topAnime, SetTopAnime] = useState([]);
  const [search, SetSearch] = useState("");
  const BASE_URL = "https://api.jikan.moe/v4";

  const GetTopAnime = async () => {
    let url = `${BASE_URL}/top/anime?filter=bypopularity&limit=20`;
    const results = await fetch(url).then((res) => res.json());
    SetTopAnime(results.data.slice(0, 5));
  };

  const HandleSearch = (e) => {
    e.preventDefault();

    FetchAnime(search);
  };

  const FetchAnime = async (query) => {
    let url = `${BASE_URL}/anime?q=${query}&order_by=title&sort=asc&limit=10`;
    const results = await fetch(url).then((res) => res.json());
    SetAnimeList(results.data);
  };

  useEffect(() => {
    GetTopAnime();
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="content-wrap">
        <Sidebar topAnime={topAnime} />
        <MainContent
          HandleSearch={HandleSearch}
          search={search}
          SetSearch={SetSearch}
          animeList={animeList}
        />
      </div>
    </div>
  );
}

export default App;
