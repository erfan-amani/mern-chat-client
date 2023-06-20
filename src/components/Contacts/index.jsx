import React from "react";
import Tab from "../Tab";
import MyContacts from "./MyContacts";
import SentRequests from "./SentRequests";
import RecievedReqests from "./RecievedReqests";

const Contacts = ({ sentRequests, receivedRequests }) => {
  return (
    <div className="mt-6">
      <Tab
        headers={["Contacts", "Sent request", "Recieved request"]}
        contents={[
          <MyContacts />,
          <SentRequests list={sentRequests} />,
          <RecievedReqests list={receivedRequests} />,
        ]}
      />
    </div>
  );
};

export default Contacts;
