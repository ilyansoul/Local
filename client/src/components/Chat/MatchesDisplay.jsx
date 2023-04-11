import axios from "axios";
import { useEffect, useState } from "react";
import '../styles/MatchesDisplay.css';

function MatchesDisplay({ matches , setClickUser }) {
  const [matchedProfiles, setMatchedProfiles] = useState([]);

  const matchedUserIds = matches.map(({ user_id }) => user_id);

  const getMatches = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users', {
        params: { userIds: JSON.stringify(matchedUserIds) },
      });
      const matches = response.data.filter(user => matchedUserIds.includes(user.user_id));
      setMatchedProfiles(matches);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      getMatches();
    }, 1000); // refresh every second

    return () => clearInterval(intervalId); // cleanup function
  }, []);

  return (
    <div className="matches-display">
      {matchedProfiles.map((match, index) => (
        <div key={index} className="match-card" onClick={() => setClickUser(match)}>
          <div className="display-picture">
            <h3>{match.first_name}</h3>
            <img className="picture-user-matches" src={match.url} alt={match.first_name + " profile"} />
            <p></p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MatchesDisplay;