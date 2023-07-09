import { useEffect, useState } from "react";
import { MovieDetails } from "./components/movieDetails";
import Loader from "./components/loader";
import { Search, SearchResults, NavBar, Logo } from "./components/navbar";
import ErrorMessage from "./components/error";
import WatchedMovieList from "./components/watchedMovieList";
import WatchedSummary from "./components/watchedSummary";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];




function Main({ children }) {


  return <main className="main">
    {children}
  </main>
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return <div className="box">
    <button
      className="btn-toggle"
      onClick={() => setIsOpen((open) => !open)}
    >
      {isOpen ? "–" : "+"}
    </button>
    {isOpen && (
      children
    )}
  </div>

}

function MovieList({ children }) {
  return <ul className="list list-movies">
    {children}
  </ul>
}

function Movie({ movie, onSelectMovie, onCloseMovie }) {
  return <li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
    <img src={movie.Poster} alt={`${movie.Title} poster`} />
    <h3>{movie.Title}</h3>
    <div>
      <p>
        <span>🗓</span>
        <span>{movie.Year}</span>
      </p>
    </div>
  </li>
}


const KEY = 'f65b005f'

export default function App() {


  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [query, setQuery] = useState("");
  const [error, setError] = useState("")
  const [selectedId, setSelectedId] = useState(null)

  const handleSelectMovie = id => {
    setSelectedId((prevId) => prevId !== id ? id : null)
  }
  const handleCloseMovie = () => {
    setSelectedId(null)
  }

  const handleAddWatched = movie => {
    setWatched(watched => [...watched, movie])
  }

  const handleRemoveWatched = (id) => {
    setWatched(watched => watched.filter(movie => movie.imdbID !== id))
  }


  //search functionality
  useEffect(
    () => {
      const controller = new AbortController()
      async function fetchMovie() {

        try {
          setIsLoading(true)
          setError("")
          const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          )

          if (!res.ok) throw new Error("something went wrong while fetching movies!!")
          const data = await res.json()
          if (data.Response === 'False') throw new Error(data.Error)
          setMovies(data.Search)
          setIsLoading(false)
          setError("")

        } catch (err) {
          if(err.name!=="AbortError")
          setError(err.message)
        }
        finally {

        }
      }

      if (query.length < 3) {
        setMovies([])
        setError("")
        return
      }
      handleCloseMovie()
      fetchMovie()

      return () => {
        controller.abort()
      }

    }, [query])

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <SearchResults movies={movies} />
      </NavBar>
      <Main >
        <Box >
          {isLoading ? (error ? <ErrorMessage message={error} /> : <Loader />) :
            <MovieList >
              {movies?.map((movie) => (
                <Movie movie={movie} key={movie.imdbID} onSelectMovie={handleSelectMovie} />
              ))}
            </MovieList>
          }

        </Box>
        <Box>
          {
            selectedId ? <MovieDetails
              onAddWatched={handleAddWatched}
              onCloseMovie={handleCloseMovie}
              watched={watched}
              selectedId={selectedId} /> :
              <>
                <WatchedSummary watched={watched} />
                <WatchedMovieList watched={watched} onRemoveWatched={handleRemoveWatched} />
              </>
          }
        </Box>
      </Main>

    </>
  );
}




