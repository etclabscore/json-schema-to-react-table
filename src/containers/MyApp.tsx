import React, { useState } from "react";
import JSONSchemaTable from "../components/JSONSchemaTable";

interface IProps {
  greeting: string;
}

function useCounter(defaultValue: number) {
  const [counter, setCounter] = useState(defaultValue);

  const incrementCounter = () => {
    setCounter(counter + 1);
  };

  return [counter, incrementCounter];
}

const MyApp = (props: IProps) => {
  const [counter, incrementCounter] = useCounter(0);
  return (
    <div>
      <div>
        {props.greeting}
        <button onClick={incrementCounter as any}>Counter = {counter}</button>
      </div>
      <JSONSchemaTable
        data={{
          foo: "bar",
          for: "baz",
        }}
        schema={{
          oneOf: [
            {
              type: "string",
            },
            {
              type: "object",
              properties: {
                foo: {
                  type: "string",
                },
                for: {
                  type: "string",
                },
              },
            },
          ],
        }} />
    </div>
  );
};

export default MyApp;
