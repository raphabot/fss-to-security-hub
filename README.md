# FSS to SecurityHub Project

Simple demonstration of FSS to AWS SecurityHub integration.

Upload `fss-to-securityhub-lambda.zip` to a bucket and take note of the key.
Start a new stack based on this template.

## Template Inputs

 * `snsScanResultTopicArn:`   FSS Results SNS Topic ARN
 * `LambdaZipBucket`          S3 bucket for lambda zip. If your have it under s3://bucket/path/to/zip.zip, enter 'bucket' here.
 * `LambdaZipKey`             S3 key for lambda zip. If your have it under s3://bucket/path/to/zip.zip, enter 'path/to/zip.zip' here. 