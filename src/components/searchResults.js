import { Component } from "react";
import axios from 'axios';
import User from './user';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "Search GitHub Users",
      users: [],
    };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    axios.get(`https://api.github.com/users/${this.state.value}`)
    .then(res => {
        console.log("handleSubmit response", res.data);
        this.setState({users: [res.data]});
    });

    console.log("Current state is:" + JSON.stringify(this.state));
    // alert("Current state is:" + JSON.stringify(this.state));
  };

  render() {
    return (
      <div>
        {/* borrowed code for form from reactjs.org/docs/forms.html */}
        <form onSubmit={this.handleSubmit}>
          <label>
            Search:{" "}
            <input
              type="text"
              placeholder={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Search" />
        </form>
        <h2>Results:</h2>
        <div>
          {this.state.users.map((USER) => {
            return <User key={USER.id} user={USER} />;
          })}
        </div>
      </div>
    );
  }
}

export default SearchResults;
