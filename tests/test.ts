import { expect as awsexpect, haveResource } from "@aws-cdk/assert";
import { Stack } from "@aws-cdk/core";

import { CheckedAwsCustomResource } from "../src/index";

test("test successful init", () => {
  // GIVEN
  const stack = new Stack();
  const props = {
    onCreate: {
      service: "RDS",
      action: "modifyDBCluster",
      parameters: {},
      physicalResourceId: `resourceId`
    }
  };
  // WHEN
  new CheckedAwsCustomResource(stack, "foo", props);
  // THEN
  awsexpect(stack).to(haveResource("Custom::AWS"));
});

test("test bad action name", () => {
  // GIVEN
  const stack = new Stack();
  const props = {
    onCreate: {
      service: "RDS",
      action: "ModifyDBCluster",
      parameters: {},
      physicalResourceId: `resourceId`
    }
  };
  expect(() => {
    // WHEN
    new CheckedAwsCustomResource(stack, "foo", props);
    // THEN
  }).toThrowError("ModifyDBCluster");
});

test("test bad service name", () => {
  // GIVEN
  const stack = new Stack();
  const props = {
    onCreate: {
      service: "FooBar",
      action: "modifyDBCluster",
      parameters: {},
      physicalResourceId: `resourceId`
    }
  };
  expect(() => {
    // WHEN
    new CheckedAwsCustomResource(stack, "foo", props);
    // THEN
  }).toThrowError("FooBar");
});
