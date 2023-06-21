import Body from "./Body";
import Header from "./Header";
import Send from "./Send";

const Messages = () => {
  return (
    <div className="flex flex-col w-[calc(100%-300px)]">
      <div className="h-[calc(100%-50px)]">
        <div className="flex flex-col h-full">
          <Header />

          <Body />
        </div>

        <Send />
      </div>
    </div>
  );
};

export default Messages;
