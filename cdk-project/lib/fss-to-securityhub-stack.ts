import * as path from 'path';
import * as cdk from '@aws-cdk/core';
import * as sns from '@aws-cdk/aws-sns';
import * as lambda from '@aws-cdk/aws-lambda';
import * as lambda_event_sources from '@aws-cdk/aws-lambda-event-sources';
import * as iam from '@aws-cdk/aws-iam';

export class FssToSecurityhubStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const snsScanResultTopicArn = new cdk.CfnParameter(this, 'snsScanResultTopicArn', {
      type: 'String'
    });
    const securityhubArn = `arn:aws:securityhub:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:product/${cdk.Aws.ACCOUNT_ID}/default`;

    const snsScanResultTopic = sns.Topic.fromTopicArn(this, 'snsScanResultTopic', snsScanResultTopicArn.valueAsString);

    const sentToSecurityHubLambdaFunction = new lambda.Function(this, 'sentToSecurityHubLambdaFunction', {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset(path.join(__dirname, 'lambda')),
      handler: 'index.handler',
      environment: {
        SECURITY_HUB_ARN: securityhubArn,
        ACCOUNT_ID: cdk.Aws.ACCOUNT_ID
      }
    });
    sentToSecurityHubLambdaFunction.addEventSource(
      new lambda_event_sources.SnsEventSource(snsScanResultTopic)
    );
    const securityHubAccessPolicyStatement = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [ 'securityhub:BatchImportFindings' ],
      resources: [ securityhubArn ]
    });
    sentToSecurityHubLambdaFunction.addToRolePolicy(securityHubAccessPolicyStatement);
  }
}
