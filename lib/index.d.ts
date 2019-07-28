import { Construct } from "@aws-cdk/core";
import { AwsCustomResourceProps, AwsCustomResource } from "@aws-cdk/custom-resources";
/**
 * An AwsCustomResource which raises an error on instantiation
 * if any action specified in its calls doesn't exist in the SDK
 */
export declare class CheckedAwsCustomResource extends AwsCustomResource {
    constructor(scope: Construct, id: string, props: AwsCustomResourceProps);
}
