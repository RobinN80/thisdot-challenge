import React, { Component } from "react";
import axios from "axios";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "Search GitHub Users",
      allusers: [],
      loading: false,
      pageSize: 5,
      currentPage: 1,
    };
  }
  componentDidMount() {
    // borrowed code below from www.pluralsight.com/guides/axios-vs-fetch
    axios
      .get("https://api.github.com/users")
      .then((res) => {
        //console.log("handleSubmit response", res.data);
        this.setState({ allusers: res.data });
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

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { value, allusers, pageSize, currentPage } = this.state;

    const usersFiltered = allusers.filter((USER) => {
      if (value === "") {
        return [];
      } else if (USER.login.toLowerCase().includes(value.toLowerCase())) {
        return USER.login;
      }
    });

    const usersPaginated = paginate(usersFiltered, currentPage, pageSize);

    return (
      <div>
        {/* borrowed code for form from reactjs.org/docs/forms.html */}
        <form>
          <label>
            Search:{" "}
            <input
              type="search"
              name="usersearch"
              placeholder={value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Search" />
        </form>
        <h2>showing {usersFiltered.length} results</h2>
        <table>
          <thead>
            <tr>
              <th>Profile Pic</th>
              <th>Username</th>
            </tr>
          </thead>
          {usersPaginated
            .map((USER) => {
              return <User key={USER.id} user={USER} />;
            })}
        </table>
        <Pagination
          itemsCount={usersFiltered.length}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
          currentPage={currentPage}
        />
      </div>
    );
  }
}

export default SearchResults;
