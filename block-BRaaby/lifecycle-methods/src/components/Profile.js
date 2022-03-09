import React from "react";

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
      text: "",
    };
  }
  componentDidMount() {
    fetch("https://randomuser.me/api/")
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          data: data,
          text: data.results[0].name.first + " " + data.results[0].name.last,
        })
      );
  }

  handleMouseOver = (field) => {
    let user = this.state.data.results[0];
    switch (field) {
      case "location":
        this.setState({
          text: `${user.location.street.number}, ${user.location.street.name}`,
        });
        break;
      case "email":
        this.setState({ text: user.email });
        break;
      case "phone":
        this.setState({ text: user.phone });
        break;
      case "password":
        this.setState({ text: user.login.password });
        break;
      case "name":
        this.setState({ text: user.name.title + " " + user.name.first });
        break;
    }
  };
  handleClick = () => {
    this.componentDidMount()
  }

  render() {
    return (
      <>
        <div className="relative">
          <article>
            <div className="profile-top "></div>
            <hr />
            <div className="relative">
              <div className="img-div">
                <img src={this.state.data? this.state.data.results[0].picture.large : ""} />
              </div>
            </div>
            <div className="profile">
              <h6>My name is </h6>
              <h3>{this.state.text}</h3>
              <div className="mt-2">
                <span
                  className="icon"
                  onMouseOver={() => this.handleMouseOver("name")}
                >
                  <i className="fa fa-user"></i>
                </span>
                <span
                  className="icon"
                  onMouseOver={() => this.handleMouseOver("email")}
                >
                  <i className="fa fa-envelope"></i>
                </span>
                <span
                  className="icon"
                  onMouseOver={() => this.handleMouseOver("location")}
                >
                  <i className="fa fa-address-book"></i>
                </span>
                <span
                  className="icon"
                  onMouseOver={() => this.handleMouseOver("phone")}
                >
                  <i className="fa fa-phone"></i>
                </span>
                <span
                  className="icon"
                  onMouseOver={() => this.handleMouseOver("password")}
                >
                  <i className="fa fa-lock"></i>
                </span>
              </div>
              <button onClick={this.handleClick}>{this.state.data? "Random User":"Loading"  }</button>
            </div>
          </article>
        </div>
      </>
    );
  }
}

export default Profile;
