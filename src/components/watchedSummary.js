export default function WatchedSummary({ watched }) {

    const roundDecimal=(num)=>{
      return +Number(num.toFixed(1))
    }
    const avgImdbRating = roundDecimal(average(watched?.map((movie) => movie.imdbRating)));
    const avgUserRating = roundDecimal(average(watched?.map((movie) => movie.userRating)));
    const avgRuntime = roundDecimal(average(watched?.map((movie) => movie.runtime)));
    return <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched?.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  }
  

  const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
