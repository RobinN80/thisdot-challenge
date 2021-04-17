import { Component } from "react";
import axios from "axios";
import User from "./user";

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "Search GitHub Users",
      users: [],
      loading: false,
    };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = (event) => {
    
    // borrowed code below from www.pluralsight.com/guides/axios-vs-fetch
    axios
      .get('https://api.github.com/users')
      .then((res) => {
        console.log("handleSubmit response", res.data);
        this.setState({ users: res.data });
      })
      .catch(
        error => {
            if (error.response) {
              console.log(error.response.data)
            } else if (error.request) {
              console.log(error.request)
            } else {
              console.log("Error", error.message)
            }
            console.log(error.config)
          }
      );

    console.log("Current state is:" + JSON.stringify(this.state));
    // alert("Current state is:" + JSON.stringify(this.state));
    event.preventDefault();
  };

  render() {
    const { value, users } = this.state;
    return (
      <div>
        {/* borrowed code for form from reactjs.org/docs/forms.html */}
        <form onSubmit={this.handleSubmit}>
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
        <h2>Results:</h2>
        <div>
          {/* borrowed code below From PedroTech youtube channel "Search Filter React Tutorial" */}
          {users
            .filter((USER) => {
              if (value == "") {
                return;
              } else if (
                USER.login.toLowerCase().includes(value.toLowerCase())
              ) {
                return USER.login;
              }
            })
            .map((USER) => {
              return <User key={USER.id} user={USER} />;
            })}
        </div>
      </div>
    );
  }
}

export default SearchResults;
