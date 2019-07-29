# Checked AWS Custom Resource

This is a wrapper around the AWS CDK's [AwsCustomResource](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_custom-resources.AwsCustomResource.html).

By default, if you specify an SDK function for `AwsCustomResource` which doens't exist, CDK will still generate a
CloudFormation template for you and attempt to deploy it, just to eventually fail.

This wrapper resolves that by complaining when you give it SDK services or actions which don't exist. The price is fairly small:
your CDK project will depend on `aws-sdk`.

To install

```
    npm install --save checked-aws-custom-resource
```

For example, this is fine.

```ts
new CheckedAwsCustomResource(stack, "Good", {
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

Meanwhile, here the captilization of "ModifyDBCluster" is wrong, so
the class will throw an exception during instantiation:

```ts
new CheckedAwsCustomResource(stack, "Bad", {
  onCreate: {
    service: "RDS",
    action: "ModifyDBCluster",
    parameters: {
      DBClusterIdentifier: db.ref,
      EnableHttpEndpoint: true
    },
    physicalResourceId: `resourceId`
  }
});
```

If this is in your Stack when you `cdk synth` it, you'll see a helpful error message.

```
    $ cdk synth MyStack
    ModifyDBCluster is not a function in AWS.RDS
```
