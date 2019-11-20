import React, { useState } from "react";
import { MethodObject, ContentDescriptorObject } from "@open-rpc/meta-schema";
import { JSONSchema4 } from "json-schema";
import { Table, TableHead, TableCell, TableRow, Typography, TableBody } from "@material-ui/core";
import Ajv from "ajv";
const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

interface IProps {
  schema: JSONSchema4;
  data: any;
}

/**
 * A React component that renders data/fields according to a JSON Schema
 */
function JSONSchemaTable(props: IProps) {
  if (props.schema.type === "array" && props.schema.items && typeof props.schema.items === "object") {
    const properties = (props.schema.items as JSONSchema4).properties;
    if (!properties) {
      return null;
    }
    return (
      <Table>
        <TableHead>
          <TableRow>
            {Object.entries(properties).map(([property, propertySchema]: [string, JSONSchema4]) => {
              return (
                <TableCell><Typography>{property}</Typography></TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(properties).map(([property, propertySchema]: [string, JSONSchema4]) => {
            if (propertySchema.type === "string") {
              return (
                <>
                  <TableCell component="th" scope="row"><Typography>{props.data[property]}</Typography></TableCell>
                </>
              );
            }
          })}
        </TableBody>
      </Table>
    );
  }
  if (props.schema.properties) {
    return (
      <Table>
        <TableHead>
          <TableRow>
            {Object.entries(props.schema.properties).map(([property, propertySchema]: [string, JSONSchema4]) => {
              return (
                <TableCell><Typography>{property}</Typography></TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(props.schema.properties).map(([property, propertySchema]: [string, JSONSchema4]) => {
            if (propertySchema.type === "string") {
              return (
                <>
                  <TableCell component="th" scope="row"><Typography>{props.data[property]}</Typography></TableCell>
                </>
              );
            }
          })}
        </TableBody>
      </Table>
    );
  }
  if (props.schema.oneOf) {
    const s = props.schema.oneOf.find((item) => {
      return ajv.validate(item, props.data);
    });
    if (s !== undefined) {
      return (
        <JSONSchemaTable schema={s} data={props.data}/>
      );
    }
    return null;
  }
  // Not Supported
  return (
    <>
      <div>NOT SUPPORTED</div>
    </>
  );
}

export default JSONSchemaTable;
