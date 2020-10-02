import React, { Component } from "react";
import SearchForm from "../SearchBar/SearchBar";
import ResultList from "../EmployeeTable/EmployeeTable";
import API from "../../utils/API"; 
import Header from "../Header/Header";

class SearchResultContainer extends Component {
  state = {
    search: "", 
    alphabetical: true,
    results: [], 
    filtResults: [], 
    sortedIcon: ""
  };

  // When this component mounts, search the API for a set amount of employees
  componentDidMount = () => {
    this.getEmployees();
  } 

  getEmployees = () => {
    API.getUsers()
      .then((res) => {
        this.setState({
          results: res.data.results,
        });
        console.log(this.state.results[0]);
      })
      .catch((err) => console.log(err));
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
    this.getEmployees(this.state.search);
  }; 


  sortByName = () => {
    let sorted = [];
    if (this.state.alphabetical) {
      this.setState({ sortedIcon: "▲"})
      sorted = this.state.results.sort((a, b) => {
        let nameA = a.name.first.toLowerCase();
        let nameB = b.name.first.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    } else {
      this.setState({ sortedIcon: "▼"})
      sorted = this.state.results.sort((a, b) => {
        let nameA = a.name.first.toLowerCase();
        let nameB = b.name.first.toLowerCase();
        if (nameA > nameB) return -1;
        if (nameA < nameB) return 1;
        return 0;
      });
    }
    this.setState({
      alphabetical: !this.state.alphabetical,
      filtResults: sorted,
    });
  };

  render() {
    return (
      <div>
        <Header />
        <SearchForm
          search={this.state.search}
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
        />
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">
                <span id="name" onClick={this.sortByName}>Name {this.state.sortedIcon}</span>
              </th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
              <th scope="col">DOB</th>
            </tr>
          </thead>
          <ResultList
            results={this.state.results.filter(
              (emp) =>
                emp.email.includes(this.state.search) ||
                emp.name.first.includes(this.state.search) ||
                emp.name.last.includes(this.state.search) ||
                emp.phone.includes(this.state.search)
            )}
          />
        </table>
      </div>
    );
  }


}

export default SearchResultContainer;
