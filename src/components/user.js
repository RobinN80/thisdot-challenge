import React, { Component } from "react";

class User extends Component {
  render() {
    console.log("userprops", this.props);
    const { login, html_url, avatar_url } = this.props.user;
    return (
      <tr>
        <td>
          <img src={avatar_url} alt="profile pic" style={{height: 75, width: 75}}/>
        </td>
        <td>
        <a href={html_url} target="_blank">{login}</a>
        </td>
      </tr>
    );
  }
}

export default User;
