import React from "react";
import PropTypes, { func } from "prop-types";
import { battle } from "../utils/api";
import {
  FaCompass,
  FaBriefcase,
  FaUsers,
  FaUserFriends,
  FaCode,
  FaUser,
} from "react-icons/fa";
import Card from "./Card";
import Loading from "./Loading";
import ToolTip from "./Tooltip";

function ProfileList({ profile }) {
  return (
    <ul className="card-list">
      <li>
        <FaUser color="rgb(239,115,115)" size={22} />
        {profile.name}
      </li>
      {profile.location && (
        <li>
          <ToolTip text="User's location">
            <FaCompass color="rgb(144,115,255)" size={22} />
            {profile.location}
          </ToolTip>
        </li>
      )}
      {profile.company && (
        <li>
          <ToolTip text="User's company">
            <FaBriefcase color="#7595548" size={22} />
            {profile.company}
          </ToolTip>
        </li>
      )}
      <li>
        <FaUsers color="rgb(129,159,245)" size={22} />
        {profile.followers.toLocaleString()} followers
      </li>
      <li>
        <FaUserFriends color="rgb(64,183,95)" size={22} />
        {profile.following.toLocaleString()} following
      </li>
    </ul>
  );
}

ProfileList.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true,
    };
  }

  componentDidMount() {
    const { playerOne, playerTwo } = this.props;

    battle([playerOne, playerTwo])
      .then((players) => {
        this.setState({
          winner: players[0],
          loser: players[1],
          error: null,
          loading: false,
        });
      })
      .catch(({ message }) => {
        this.setState({
          error: message,
          loading: false,
        });
      });
  }

  render() {
    const { winner, loser, error, loading } = this.state;

    if (loading === true) {
      return <Loading text="Loading" text="Battling" />;
    }

    if (error) {
      return <p className="center-text error">{error}</p>;
    }

    return (
      <React.Fragment>
        <div className="grid space-around container-sm">
          <Card
            header={winner.score === loser.score ? "Tie" : "Winner"}
            subHeader={`Score: ${winner.score.toLocaleString()}`}
            avatar={winner.profile.avatar_url}
            href={winner.profile.html_url}
            name={winner.profile.login}
          >
            <ProfileList profile={winner.profile} />
          </Card>

          <Card
            header={winner.score === loser.score ? "Tie" : "Loser"}
            subHeader={`Score: ${loser.score.toLocaleString()}`}
            avatar={loser.profile.avatar_url}
            name={loser.profile.login}
            href={loser.profile.html_url}
          >
            <ProfileList profile={loser.profile} />
          </Card>
        </div>

        <button onClick={this.props.onReset} className="btn dark-btn btn-space">
          Reset
        </button>
      </React.Fragment>
    );
  }
}

Results.propTypes = {
  playerOne: PropTypes.string.isRequired,
  playerTwo: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
};
