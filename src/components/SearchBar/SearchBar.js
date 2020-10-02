import React from "react"; 
import "./SearchBar.css"

function SearchBar(props) {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="searchTitle" id ="searchTitle">Search:</label>
        <input
          onChange={props.handleInputChange}
          value={props.search}
          name="search"
          type="text"
          className="form-control"
          placeholder="Search for an employee"
          id="search"
        />
        <button onClick={props.handleFormSubmit} className="btn btn-danger mt-3">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
