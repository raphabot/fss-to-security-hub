import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as FssToSecurityhub from '../lib/fss-to-securityhub-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new FssToSecurityhub.FssToSecurityhubStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
