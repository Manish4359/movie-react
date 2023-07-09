export function Search({ query, setQuery }) {

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