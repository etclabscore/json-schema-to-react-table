import React from "react";
import JSONSchemaTable from "../components/JSONSchemaTable";
import { Typography } from "@material-ui/core";

interface IProps {
  greeting: string;
}

const MyApp = (props: IProps) => {
  return (
    <div>
      <Typography variant="h3" gutterBottom>Blocks</Typography>
      <JSONSchemaTable
        data={[
          {
            number: "1",
            hash: "0x00",
            timestamp: "November 20th",
            transactions: 7,
          },
          {
            number: "1",
            hash: "0x00",
            timestamp: "November 20th",
            transactions: 7,
          },
        ]}
        schema={{
          type: "array",
          items: {
            type: "object",
            description: "A Block",
            properties: {
              number: {
                type: "string",
              },
              hash: {
                type: "string",
              },
              timestamp: {
                description: "timestamp in which the block occured",
                type: "string",
              },
              transactions: {
                type: "number",
              },
            },
          },
        }} />
      <br />
      <Typography variant="h3" gutterBottom>Block 1</Typography>
      <JSONSchemaTable
        data={{
          number: "1",
          hash: "0x00",
          timestamp: "November 20th",
          transactions: "7",
        }}
        schema={{
          type: "object",
          properties: {
            number: {
              type: "string",
            },
            hash: {
              type: "string",
            },
            timestamp: {
              description: "timestamp in which the block occured",
              type: "string",
            },
            transactions: {
              type: "string",
            },
          },
        }} />
    </div>
  );
};

export default MyApp;
