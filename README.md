# Checked AWS Custom Resource

This is a wrapper around the AWS CDK's [AwsCustomResource](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_custom-resources.AwsCustomResource.html), which complains when you give it SDK services or actions which don't exist.

To install

```
    npm install --save checked-aws-custom-resource
```

For example, this is fine:

```ts
new CheckedAwsCustomResource(stack, "Good", {
  onCreate: {
    service: "RDS",
    action: "modifyDBCluster",
    parameters: {},
    physicalResourceId: `resourceId`
  }
});
```

but if you get the capitalization wrong, it will fail during instantiation.

```ts
new CheckedAwsCustomResource(stack, "Good", {
  onCreate: {
    service: "RDS",
    action: "ModifyDBCluster",
    parameters: {},
    physicalResourceId: `resourceId`
  }
});
```

If this is in your Stack when you `synth` it, you'll see:

```
    $ cdk synth MyStack
    ModifyDBCluster is not a function in AWS.RDS
```
