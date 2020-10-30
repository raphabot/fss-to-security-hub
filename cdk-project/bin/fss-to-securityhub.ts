#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { FssToSecurityhubStack } from '../lib/fss-to-securityhub-stack';

const app = new cdk.App();
new FssToSecurityhubStack(app, 'FssToSecurityhubStack');
