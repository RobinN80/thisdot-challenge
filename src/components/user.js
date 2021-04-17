import React, { Component } from "react";

class User extends Component {
  render() {
    //console.log("userprops", this.props);
    const { login, url } = this.props.user;
    return (
      <tr>
        <td>
          <a href={url}>{login}</a>
        </td>
      </tr>
    );
  }
}

export default User;
