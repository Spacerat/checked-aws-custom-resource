# Checked AWS Custom Resource

This is a wrapper around the AWS CDK's [AwsCustomResource](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_custom-resources.AwsCustomResource.html).

By default, if you specify an SDK function for `AwsCustomResource` which doens't exist, CDK will still generate a
CloudFormation template for you and attempt to deploy it, just to eventually fail.

This wrapper resolves that by complaining when you give it SDK services or actions which don't exist. The price is fairly small:
your CDK project will depend on `aws-sdk`.

### Installation

    npm install --save checked-aws-custom-resource

### Usage

This class is used identically to `AwsCustomResource`. For example:

```ts
import { CheckedAwsCustomResource } from "checked-aws-custom-resource";

new CheckedAwsCustomResource(stack, "Resource", {
  onCreate: {
    service: "RDS",
    action: "modifyDBCluster",
    parameters: {
      DBClusterIdentifier: db.ref,
      EnableHttpEndpoint: true
    },
    physicalResourceId: `resourceId`
  }
});
```

However, if the service or action is does not exist, e.g the action could be miscapitalized as "ModifyDBCluster",
the class will throw an exception during instantiation. For example:

    $ cdk synth MyStack
    ModifyDBCluster is not a function in AWS.RDS
