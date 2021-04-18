import React, { Component } from "react";
import axios from "axios";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "robin",
      users: [],
      loading: false,
      pageSize: 5,
      currentPage: 1,
      total_count: 0,
    };
  }
  componentDidUpdate() {
    // borrowed code below from www.pluralsight.com/guides/axios-vs-fetch
    axios
      .get(`https://api.github.com/search/users?q=${this.state.value}`)
      .then((res) => {
        console.log("get response", res.data);
        this.setState({
          users: res.data.items,
          total_count: res.data.total_count,
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }

  handleSubmit = (event) => {
    console.log("Current State is:", +JSON.stringify(this.state));
    this.setState({ value: event.target.value });
  };

//   handlePageChange = (event) => {
//     this.setState({ value: event.target.value });
//   };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { value, users, pageSize, currentPage, total_count } = this.state;

    // const usersFiltered = users.filter((USER) => {
    //   if (value === "") {
    //     return [];
    //   } else if (USER.login.toLowerCase().includes(value.toLowerCase())) {
    //     return USER.login;
    //   }
    // });

    const usersPaginated = paginate(users, currentPage, pageSize);

    return (
      <div>
        {/* borrowed code for form from reactjs.org/docs/forms.html */}
        <form onSubmit={this.handleSubmit}>
          <label>
            Search:{" "}
            <input
              type="search"
              name="usersearch"
              placeholder="Search GitHub Users"
              //onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Search" />
        </form>
        <h2>{total_count} results</h2>
        <table>
          <thead>
            <tr>
              <th>Profile Pic</th>
              <th>Username</th>
            </tr>
          </thead>
          {usersPaginated.map((USER) => {
            return <User key={USER.id} user={USER} />;
          })}
        </table>
        <Pagination
          itemsCount={users.length}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
          currentPage={currentPage}
        />
      </div>
    );
  }
}

export default SearchResults;
