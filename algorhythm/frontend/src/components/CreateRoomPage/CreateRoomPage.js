import React, { Component } from "react";

class CreateRoomPage extends Component {
  // defaultVotes = 2;

  static defaultProps = {
    votes_for_skip: 2,
    can_guests_pause: true,
    update: false,
    roomCode: null,
    updateCallback: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      can_guests_pause: this.props.can_guests_pause,
      votes_for_skip: this.props.votes_for_skip,
      successMsg: "",
      errorMsg: "",
    };
  }

  handleCanGuestPauseChange = (e) => {
    // e.preventDefault();
    var a = e.target.value;
    console.log(a);
    this.setState({
      can_guests_pause: e.target.value === "true" ? true : false,
    });
  };

  handleVotesChange = (e) => {
    // e.preventDefault();
    this.setState({
      votes_for_skip: e.target.value,
    });
  };

  handleEmail = (e) => {
    // e.preventDefault();
    this.setState({
      email: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        votes_for_skip: this.state.votes_for_skip,
        can_guests_pause: this.state.can_guests_pause,
      }),
    };
    fetch("/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => this.props.history.push(`/room/${data.code}`));
  };

  handleUpdateButtonClick = () => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_for_skip: this.state.votes_for_skip,
        can_guests_pause: this.state.can_guests_pause,
        code: this.props.code,
      }),
    };
    fetch("/api/update-room", requestOptions).then((response) => {
      if (response.ok) {
        this.setState({
          successMsg: "Room updated!",
        });
      } else {
        this.setState({
          errorMsg: "Error: Room not updated!",
        });
      }
      this.props.updateCallback();
    });
  };

  goBack = (e) => {
    this.props.history.push("/");
  };

  renderCreateButton = (e) => {
    return (
      <div id="create-button">
        <label>
          Email
          <input id="email-submit" type="text" onChange={this.handleEmail} />
        </label>
        <br></br>

        <input id="submit-btn" type="submit" className="createSubmit" value="Create a Room" />

        <button id="back" className="joinSubmit" onClick={this.goBack}>Back</button>

      </div>
    );
  };

  renderUpdateButton = (e) => {
    return (
      <button id="update-button" className="createSubmit" onClick={this.handleUpdateButtonClick}>
            Update Room
      </button>;
    );
  };

  render() {
    const title = this.props.update ? "Update Room" : "Create a Room";
    return (
      <div className="mainPage create">
        {/* <Collaspe in={this.state.errorMsg != "" || this.state.successMsg != ""}>
          {this.state.successMsg}
        </Collaspe> */}
        {this.state.responseMsg ? alert(this.state.responseMsg) : null}
        <h1>{title}</h1>
        <form className="guest" onSubmit={this.handleSubmit}>
          <label className="guest">
            Guest Control of Playback State
            <input
              id="pause-true"
              type="radio"
              value="true"
              onChange={this.handleCanGuestPauseChange}
            />{" "}
            True
            <input
              id="pause-false"
              type="radio"
              value="false"
              onChange={this.handleCanGuestPauseChange}
            />{" "}
            False
          </label>
          <br></br>
          <label className="guest">
            Votes Required To Skip Song
            <input
              id="votes-input"
              type="number"
              min="1"
              max="4"
              value={this.state.votes_for_skip}
              onChange={this.handleVotesChange}
            />
          </label>
          <br></br>

          {this.props.update ? null : this.renderCreateButton()}
        </form>
        {this.props.update ? this.renderUpdateButton() : null}
      </div>
    );
  }
}

export default CreateRoomPage;
