import React, { Component } from "react";
import Like from "./Common/Heart";
import Table from "./Common/Table";
import { Link } from "react-router-dom";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: movie => (
        <Like
          liked={movie.liked}
          movie={movie}
          onAttacked={this.props.onLike}
        />
      )
    },
    {
      key: "delete",
      content: (movie, user) =>
        user.isAdmin && (
          <button
            key={movie.id}
            onClick={() => this.props.onDelete(movie)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        )
    }
  ];
  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        data={movies}
        onSort={onSort}
        sortColumn={sortColumn}
        columns={this.columns}
      />
    );
  }
}

export default MoviesTable;
