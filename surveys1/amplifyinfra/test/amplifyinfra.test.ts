import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Amplifyinfra from '../lib/amplifyinfra-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Amplifyinfra.AmplifyinfraStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
