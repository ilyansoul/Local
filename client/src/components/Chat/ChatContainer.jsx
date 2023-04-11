import React, { useState, useEffect } from "react";
import ChatDisplay from "./ChatDisplay";
import MatchesDisplay from "./MatchesDisplay";
import "../styles/ChatContainer.css";

function ChatContainer({ user }) {
  const [clickedUser, setClickUser] = useState(null);


  return (
    <div className="chat-container">
      <div className="btn-position">
        <button className="match-btn" onClick={() => setClickUser(null)}>
          Matches
        </button>
        <button className="chat-btn" disabled={!clickedUser}>
          Chat
        </button>
      </div>
      {!clickedUser && (
        <MatchesDisplay
          matches={user.matches}
          setClickUser={setClickUser}
          ref={(instance) => (MatchesDisplay.getMatches = instance?.getMatches)}
        />
      )}
      {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser} />}
    </div>
  );
}

export default ChatContainer;