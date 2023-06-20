import React from "react";

const MyContacts = ({ list = [] }) => {
  if (!list.length) {
    return <div className="text-center">No contact!</div>;
  }

  return (
    <div>
      {list.map(user => (
        <div>{user.username}</div>
      ))}
    </div>
  );
};

export default MyContacts;
