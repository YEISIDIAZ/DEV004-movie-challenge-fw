import { useState, useEffect } from "react";
import Card from "./Card";
import Logo from "../Imagens/Logo.png";

let API_key = "&api_key=f46d41d831c89384bd13152986afb3f3";
let base_url = "https://api.themoviedb.org/3/";
let url = base_url + "/discover/movie?sort_by=popularity.desc" + API_key;
let arr = ["En Cartelera", "Popular", "Taquilleras", "Estrenos 2023", "Infantil", "Drama", "Comedia" , "Acción" , "Aventura" , "Romance", "Terror"];

const Main = () => {

  const [movieData, setData] = useState([]); 
  const [url_set, setUrl] = useState(url);
  const [search, setSearch] = useState();

  useEffect(() => {
    fetch(url_set)
      .then((res) => res.json())
      .then((data) => {
        setData(data.results);
      });
  }, [url_set]);

  const getData = (movieType) => {

    if (movieType === "Popular") {
      url = base_url + "/discover/movie?sort_by=popularity.desc" + API_key;
    }

    if (movieType === "En Cartelera") {
      // Obtener la fecha actual
      const currentDate = new Date();
      
      // Obtener la fecha límite (hace un mes a partir de la fecha actual)
      const lastMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
    
      // Formatear las fechas en el formato YYYY-MM-DD
      const currentDateFormatted = currentDate.toISOString().slice(0, 10);
      const lastMonthDateFormatted = lastMonthDate.toISOString().slice(0, 10);
      
      // Construir la URL con las fechas y el país (Colombia)
      url =
        base_url +
        `/movie/now_playing?primary_release_date.gte=${lastMonthDateFormatted}&primary_release_date.lte=${currentDateFormatted}&region=CO` +
        API_key;
    }
    
    if (movieType === "Taquilleras") {
      url =
        base_url +
        "/discover/movie?sort_by=revenue.desc" +
        API_key;
    }
    


    if (movieType === "Estrenos 2023") {
      // Obtener la fecha actual
      const currentDate = new Date();
      
      // Formatear las fechas en el formato YYYY-MM-DD
      const currentDateFormatted = currentDate.toISOString().slice(0, 10);
      const year2023StartDate = "2023-01-01";
      
      // Construir la URL con las fechas
      url =
        base_url +
        `/discover/movie?primary_release_date.gte=${year2023StartDate}&primary_release_date.lte=${currentDateFormatted}` +
        API_key;
    }
    


    if (movieType === "Infantil") {
      url =
        base_url +
        "/discover/movie?certification_country=CO&certification.lte=G&sort_by=popularity.desc" +
        API_key;
    }

    if (movieType === "Drama") {
      url =
        base_url +
        "/discover/movie?with_genres=18&primary_release_year=2023" +
        API_key;
    }


    if (movieType === "Comedia") {
      url =
        base_url +
        "/discover/movie?with_genres=35&primary_release_year=2023" +
        API_key;
    }

    if (movieType === "Acción") {
      url =
        base_url +
        "/discover/movie?with_genres=28&primary_release_year=2023" +
        API_key;
    }

    if (movieType === "Aventura") {
      url =
        base_url +
        "/discover/movie?with_genres=12&primary_release_year=2023" +
        API_key;
    }
    
    if (movieType === "Romance") {
      url =
        base_url +
        "/discover/movie?with_genres=10749&primary_release_year=2023" +
        API_key;
    }

   
    if (movieType === "Terror") {
      url =
        base_url +
        "/discover/movie?with_genres=27&primary_release_year=2023" +
        API_key;
    }
    
    
    
    






    setUrl(url);
  };

  const searchMovie = (evt) => {
    if (evt.key === "Enter") {
      url =
        base_url +
        "/search/movie?api_key=db95773a7fb212ba790d71f6adac0e7e&query=" +
        search;
      setUrl(url);
      setSearch("");
    }
  };

  return (
    <>
      <div className="header">
      <div className="logo">
  <img src={Logo} alt="Logo" />
</div>
        <nav>
          <ul>
            {arr.map((value, pos) => (
              <li key={pos}>
                <a
                  href="#"
                  name={value}
                  onClick={(e) => {
                    getData(e.target.name);
                  }}
                >
                  {value}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <form>
          <div className="search-btn">
            <input
              type="text"
              placeholder="Enter Movie Name"
              className="inputText"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              value={search}
              onKeyPress={searchMovie}
            />
            <button>
              <i className="fas fa-search"></i>
            </button>
          </div>
        </form>
      </div>
      <div className="container">
        {movieData.length === 0 ? (
          <p className="notfound">Not Found</p>
        ) : (
          movieData.map((res, pos) => (
            <Card info={res} key={pos} />
          ))
        )}
      </div>
    </>
  );
};

export default Main;
