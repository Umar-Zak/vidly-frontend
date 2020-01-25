import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getMovies, deleteMovie } from "../services/movieService";
import MoviesTable from "./MoviesTable";
import Pagination from "./Common/Pagination";
import { paginate } from "../utils/Paginate";
import { getGenres } from "../services/genreService";
import Genre from "./Common/Genre";
import _ from "lodash";
import SearchQuery from "./Common/searchQuery";

class Counter extends Component {
  state = {
    movies: [],
    pageSize: 3,
    currentPage: 1,
    genres: [],
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
    selectedGenre: null
  };

  async componentDidMount() {
    const { data: movieData } = await getMovies();
    const { data } = await getGenres();
    const genres = [{ name: "All Genres" }, ...data];
    this.setState({ movies: movieData, genres });
  }

  handleGenreChange = genre => {
    this.setState({
      selectedGenre: genre,
      currentPage: 1,
      searchQuery: ""
    });
  };

  handlePageChange = pageNumber => {
    this.setState({ currentPage: pageNumber });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movie.liked = movie.liked ? false : true;
    movies[index] = movie;
    this.setState({ movies });
  };

  render() {
    return <div className="container">{this.renderMovies()}</div>;
  }

  handleDelete = async movie => {
    const originalState = this.state.movies;
    const movies = originalState.filter(m => m._id !== movie._id);
    this.setState({ movies });
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted");

      this.setState({ movies: originalState });
    }
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentGenre: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn: sortColumn });
  };
  pagedDate = () => {
    const {
      searchQuery,
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      movies: allMovies
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(m => m.genre.name === selectedGenre.name);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return { countValue: filtered.length, data: movies };
  };

  renderMovies = () => {
    const { movies: allMovies } = this.state;
    const { user } = this.props;
    // if (allMovies.length === 0)
    //   return <h1 className="text text-danger">No Movies In Database</h1>;
    const {
      searchQuery,
      pageSize,
      currentPage,
      genres,
      selectedGenre
    } = this.state;
    const { countValue, data: movies } = this.pagedDate();
    return (
      <React.Fragment>
        <div className="row mt-10">
          <div className="col-sm-12 col-sm-md-3 col-lg-3">
            <Genre
              items={genres}
              onItemSelect={this.handleGenreChange}
              selectedGenre={selectedGenre}
            />
          </div>

          <div className="col-sm-12 col-sm-md-9 col-lg-9">
            {user && (
              <Link to="/movies/newmovie" className="btn btn-primary my-3">
                New Movie
              </Link>
            )}
            <SearchQuery value={searchQuery} onChange={this.handleSearch} />
            <h1>Showing {countValue} From The Database</h1>
            <MoviesTable
              movies={movies}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
              sortColumn={this.state.sortColumn}
            />
            <Pagination
              count={countValue}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </React.Fragment>
    );
  };
}

export default Counter;
