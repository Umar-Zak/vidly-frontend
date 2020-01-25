import React, { Component } from "react";

class MoviesDetail extends Component {
  state = {};

  handleSave = () => {
    this.props.history.push("/movies");
  };
  render() {
    return (
      <div>
        <h1>Movie Id:{this.props.match.params.id}</h1>
        <button className="btn btn-primary" onClick={this.handleSave}>
          Save
        </button>
      </div>
    );
  }
}

export default MoviesDetail;
