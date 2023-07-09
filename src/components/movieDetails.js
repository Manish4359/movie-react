import { useEffect, useState } from "react";
import StarRating from "./starRating";
import Loader from "./loader";

const KEY = 'f65b005f'


export function MovieDetails({onAddWatched, selectedId, onCloseMovie,watched }) {

    const [movie, setMovie] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [userRating,setUserRating]=useState(0)


    const isWatched=watched.map(movie=>movie.imdbID).includes(selectedId)
    const watchedUserRating=watched.find(movie=> movie.imdbID===selectedId)?.userRating

  
    //select movie functionality
    useEffect(() => {
      setIsLoading(true)
      const fetchMovieDetails = async () => {
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`)
        const data = await res.json()
        setMovie(data)
      setIsLoading(false)
  
      }
      if (!selectedId) return
      fetchMovieDetails()
    }, [selectedId])

    

  

  
    const {
      Title:title,
      Year:year,
      Poster:poster,
      Runtime:runtime,
      imdbRating,
      Plot:plot,
      Released:released,
      Actors:actors,
      Director:director,
      Genre:genre
    }=movie

    useEffect(()=>{

      
     title && (document.title=`Movie | ${title}`)

     return ()=>document.title="usePopcorn"
    },[title])



  
    const handleAdd=()=>{
      if(isWatched)return
      const newMovie={
        imdbID:selectedId,
        title,
        year,
        poster,
        imdbRating:Number(imdbRating),
        runtime:runtime.split(" ")[0],
        userRating
      }
      onAddWatched(newMovie)
      onCloseMovie()
    }
  
    return isLoading?<Loader/>:<div className="details">
      <header>
        <button className="btn-back" onClick={onCloseMovie}>&larr;</button>
        <img src={poster} alt={title} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p><span>⭐</span>
            {imdbRating} IMDb rating</p>
        </div>
      </header>
      <section>
        <div className="rating">
          {
            !isWatched?
           <>
            <StarRating maxRating={10} size={24} onSetUserRating={setUserRating}/>
            {(userRating>0 && !isWatched) && <button className="btn-add" onClick={handleAdd}>+Add to list</button>}
           </>
           :<p>You have rated this movie {watchedUserRating}⭐</p>
          }
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring {actors}</p>
        <p>Directed by {director}</p>
      </section>
    </div>
  
  
  }
  