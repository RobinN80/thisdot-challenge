import { Component } from "react";

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "Search GitHub Users",
      users: [],
    };
  }

  componentDidMount() {}

  handleSubmit = (event) => {
    console.log("Current state is:" + JSON.stringify(this.state));
    alert("Current state is:" + JSON.stringify(this.state));

    event.preventDefault();
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <div>
        {/* Forms from reactjs.org/docs/forms.html */}
        <form onSubmit={this.handleSubmit}>
          <label>
            Search:{" "}
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Search" />
        </form>
        <h2>Results:</h2>
        {/* <div>
          {this.state.users.map((USER) => {
            return <USER key={USER.id} user={USER} />;
          })}
        </div> */}
      </div>
    );
  }
}

export default SearchResults;
