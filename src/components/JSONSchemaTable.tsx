import React, { useState } from "react";
import { MethodObject, ContentDescriptorObject } from "@open-rpc/meta-schema";
import { JSONSchema4 } from "json-schema";
import { Table, TableHead, TableCell, TableRow, Typography, TableBody, Tooltip } from "@material-ui/core";
import Ajv from "ajv";
const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

interface IProps {
  schema: JSONSchema4;
  data: any;
}

interface IJSONSchemaStringProps {
  string: string;
  description?: string;
}

export const JSONSchemaTableString = (props: IJSONSchemaStringProps) => {
  if (props.description) {
    return (
      <Tooltip title={props.description}>
        <TableCell component="th" scope="row"><Typography>{props.string}</Typography></TableCell>
      </Tooltip>
    );
  }
  return (
    <TableCell component="th" scope="row"><Typography>{props.string}</Typography></TableCell>
  );
};

/**
 * A React component that renders data/fields according to a JSON Schema
 */
export const JSONSchemaTable = (props: IProps) => {
  const isArrayItemsObject = props.schema.type === "array"
    && props.schema.items
    && typeof props.schema.items === "object";
  if (isArrayItemsObject) {
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
                <TableCell>
                  {propertySchema.description ?
                    <Tooltip title={propertySchema.description} placement="top-start">
                      <Typography>{property}</Typography>
                    </Tooltip>
                    :
                    <Typography>{property}</Typography>
                  }
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((value: any, index: number) => {
            return (
              <TableRow>
                {
                  Object.entries(properties).map(([property, propertySchema]: [string, JSONSchema4]) => {
                    if (propertySchema.type === "string" || propertySchema.type === "number") {
                      return (
                        <JSONSchemaTableString string={value[property]} />
                      );
                    }
                    if (propertySchema.type === "object") {
                      //
                      // recursion territory
                    }
                    return null;
                  })
                }
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }
  if (props.schema.properties) {
    return (
      <Table>
        <TableHead>
          {Object.entries(props.schema.properties).map(([property, propertySchema]: [string, JSONSchema4]) => {
            return (
              <TableRow>
                <TableCell>
                  {propertySchema.description ?
                    <Tooltip title={propertySchema.description} placement="top-start">
                      <Typography>
                        {property}
                      </Typography>
                    </Tooltip>
                    :
                    <Typography>{property}</Typography>
                  }
                </TableCell>
                {propertySchema.type === "string" ? <JSONSchemaTableString string={props.data[property]} /> : null}
                {propertySchema.type === "number" ? <JSONSchemaTableString string={props.data[property]} /> : null}
              </TableRow>
            );
          })}
        </TableHead>
      </Table>
    );
  }
  if (props.schema.oneOf) {
    const s = props.schema.oneOf.find((item) => {
      return ajv.validate(item, props.data);
    });
    if (s !== undefined) {
      return (
        <JSONSchemaTable schema={s} data={props.data} />
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
};

export default JSONSchemaTable;
