import React from "react";
import ReactDOM from "react-dom";
import JSONSchemaTable from "./JSONSchemaTable";

it("renders with a valid schema", () => {
  const div = document.createElement("div");
  ReactDOM.render(<JSONSchemaTable
    data={{
      foo: "bar",
    }}
    schema={{
      type: "object",
      properties: {
        foo: {
          type: "string",
        },
      },
    }} />, div);

  expect(div.innerHTML.includes("foo")).toBe(true);
  expect(div.innerHTML.includes("bar")).toBe(true);

  ReactDOM.unmountComponentAtNode(div);
});

it("renders with a valid oneOf schema", () => {
  const div = document.createElement("div");
  ReactDOM.render(<JSONSchemaTable
    data={{
      foo: "bar",
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
          },
        },
      ],
    }} />, div);

  expect(div.innerHTML.includes("foo")).toBe(true);
  expect(div.innerHTML.includes("bar")).toBe(true);

  ReactDOM.unmountComponentAtNode(div);
});
