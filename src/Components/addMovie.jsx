import React from "react";
import { toast } from "react-toastify";
import Joi from "joi-browser";
import Form from "./Common/Form";
import { getMovie, saveMovie } from "./../services/movieService";
import { getGenres } from "../services/genreService";
class AddMovie extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    errors: {},
    genres: []
  };
  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Stock"),
    dailyRentalRate: Joi.number()
      .min(1)
      .max(11)
      .required()
      .label("Rate")
  };

  populateGenres = async () => {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  };

  populateMovieForm = async () => {
    const { match, history } = this.props;
    try {
      if (this.props.match.params.id === "newmovie") return null;

      const { data: movie } = await getMovie(match.params.id);
      this.mapToModel(movie);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        history.replace("/not-found");
    }
  };

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovieForm();
  }

  mapToModel = movie => {
    const data = { ...this.state.data };
    data._id = movie._id;
    data.title = movie.title;
    data.genreId = movie.genre._id;
    data.numberInStock = movie.numberInStock;
    data.dailyRentalRate = movie.dailyRentalRate;
    this.setState({ data });
  };

  doSubmit = async () => {
    const { data } = this.state;

    try {
      await saveMovie(data);
      this.props.history.push("/");
    } catch (ex) {
      toast.error("Movie could not be saved");
    }
  };
  render() {
    return (
      <div>
        {this.renderInput("title", "Title")}
        {this.renderSelect("genreId", "Genre", this.state.genres)}
        {this.renderInput("numberInStock", "Stock", "number")}
        {this.renderInput("dailyRentalRate", "Rate", "number")}
        {this.renderButton("Add")}
      </div>
    );
  }
}

export default AddMovie;
