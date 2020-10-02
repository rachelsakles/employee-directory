import React, { Component } from "react";
import SearchForm from "./SearchBar";
import ResultList from "./EmployeeTable";
import API from "../utils/API";

class SearchResultContainer extends Component {
  state = {
    search: "",
    results: [], 
    filtered: []
  };

  // When this component mounts, search the API for a set amount of employees
  componentDidMount = () => {
    this.getEmployees();
  }  

  // Get response from the API call
  getEmployees = () => {
    API.getUsers()
      .then((res) => {
        this.setState({
          results: res.data.results, 
          filtered: res.data.results
        });
        console.log(this.state.results[0]);
      })
      .catch((err) => console.log(err));
  }; 

  searchEmployees = (query) => {
    const filteredEmployees = this.state.results.filter(
      (emp) =>
        emp.cell.includes(query) ||
        emp.email.includes(query) ||
        emp.name.first.includes(query) ||
        emp.name.last.includes(query) ||
        emp.phone.includes(query)
    );
    // sets this.state.results to the newly filtered array
    this.setState({ filtered: filteredEmployees });
  };


  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, search the Giphy API for `this.state.search`
  handleFormSubmit = event => {
    event.preventDefault();
    this.searchEmployees(this.state.search);
  };

  render() {
    return (
      <div>
        <SearchForm
          search={this.state.search}
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
        />
        <ResultList results={this.state.filtered} />
      </div>
    );
  }
}

export default SearchResultContainer;
