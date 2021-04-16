import React, { Component } from "react";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { login } = this.props.user;
    return (
      <ul>
        <li>{login}</li>
      </ul>
    );
  }
}

export default User;
