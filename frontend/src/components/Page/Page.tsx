import React, { useState } from "react";
import Block from "../TextBlock/TextBlock";

const Page: React.FC = () => {
  const [title, setTtitle] = useState("");

  const handleChange = (event: any) => {
    setTtitle(event.target.value);
  };

  return (
    <>
      <Block size={40} placeholder={"Untitiled"} content={title} />
      <div className="page-core">
        <Block
          size={16}
          placeholder={"Press 'space' for AI, '/' for commands..."}
          content={""}
        />
      </div>
    </>
  );
};

export default Page;
