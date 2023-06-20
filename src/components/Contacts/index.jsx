import React from "react";
import Tab from "../Tab";
import MyContacts from "./MyContacts";
import SentRequests from "./SentRequests";
import ReceivedRequests from "./ReceivedRequests";

const Contacts = ({ sentRequests, receivedRequests, socket }) => {
  return (
    <div className="mt-6">
      <Tab
        headers={["Contacts", "Sent request", "Received request"]}
        contents={[
          <MyContacts />,
          <SentRequests list={sentRequests} socket={socket} />,
          <ReceivedRequests list={receivedRequests} socket={socket} />,
        ]}
      />
    </div>
  );
};

export default Contacts;
