import AWS = require("aws-sdk");
import { Construct } from "@aws-cdk/core";
import {
  AwsCustomResourceProps,
  AwsCustomResource,
  AwsSdkCall
} from "@aws-cdk/custom-resources";

/**
 * An AwsCustomResource which raises an error on instantiation
 * if any action specified in its calls doesn't exist in the SDK
 */
export class CheckedAwsCustomResource extends AwsCustomResource {
  constructor(scope: Construct, id: string, props: AwsCustomResourceProps) {
    checkCall(props.onCreate);
    checkCall(props.onUpdate);
    checkCall(props.onDelete);
    super(scope, id, props);
  }
}

/**
 * Raise an error if AwsSdkCall references an SDK method which does not exist
 * @param call The AwsSdkCall to check
 */
function checkCall(call?: AwsSdkCall) {
  if (!call) {
    return;
  }
  if (typeof (AWS as any)[call.service] !== "function") {
    throw new Error(`${call.service} is not a valid SDK service`);
  }

  const awsService: { [name: string]: Function } = new (AWS as any)[
    call.service
  ](call.apiVersion && { apiVersion: call.apiVersion });

  if (typeof awsService[call.action] !== "function") {
    throw new Error(`${call.action} is not a function in AWS.${call.service}`);
  }
}
