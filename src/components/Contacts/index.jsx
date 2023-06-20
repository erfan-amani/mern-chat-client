import React from "react";
import Tab from "../Tab";
import MyContacts from "./MyContacts";
import SentRequests from "./SentRequests";
import RecievedReqests from "./RecievedReqests";

const Contacts = ({ sentRequests, receivedRequests, socket }) => {
  return (
    <div className="mt-6">
      <Tab
        headers={["Contacts", "Sent request", "Recieved request"]}
        contents={[
          <MyContacts />,
          <SentRequests list={sentRequests} socket={socket} />,
          <RecievedReqests list={receivedRequests} socket={socket} />,
        ]}
      />
    </div>
  );
};

export default Contacts;
