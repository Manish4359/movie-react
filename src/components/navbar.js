import { useEffect, useState } from "react"

export function Search({ query, setQuery }) {


  //one of the way to decrease the number of api calls by adding a settimeout to the input 
  // const [q,sq]=useState(query)
  // useEffect(()=>{
  //   const timer=setTimeout(
  //     handle,500)

  // return ()=> clearTimeout(timer)
  // })

  // const handle=()=>{
  //   setQuery(q)
  // }
  
    return <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  }
  
  export function Logo() {
  
    return <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  }
  
  export function SearchResults({ movies }) {
    return <p className="num-results">
      Found <strong>{movies?.length}</strong> results
    </p>
  }
  
  export function NavBar({ children }) {
    return <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  }