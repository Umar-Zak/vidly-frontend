import React from "react";
const Genre = ({ items, onItemSelect, selectedGenre }) => {
  return (
    <ul className="list-group">
      {items.map(genre => (
        <li
          onClick={() => onItemSelect(genre)}
          className={
            selectedGenre === genre
              ? "list-group-item active"
              : "list-group-item"
          }
          key={genre.name}
          style={{ cursor: "pointer" }}
        >
          {genre.name}
        </li>
      ))}
    </ul>
  );
};

export default Genre;
