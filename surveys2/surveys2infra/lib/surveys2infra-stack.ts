import * as codebuild from '@aws-cdk/aws-codebuild';
import * as amplify from '@aws-cdk/aws-amplify';
import * as cdk from '@aws-cdk/core';

export class Surveys2InfraStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const amplifyApp = new amplify.App(this, 'surveys2', {
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: 'alexgifeicloud',
        repository: 'amplifyreact',
        oauthToken: cdk.SecretValue.plainText('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')
      })
    });

    const master = amplifyApp.addBranch('master'); // `id` will be used as repo branch name
    const dev = amplifyApp.addBranch('dev');
    master.addEnvironment('AMPLIFY_MONOREPO_APP_ROOT', 'surveys2');
    dev.addEnvironment('AMPLIFY_MONOREPO_APP_ROOT', 'surveys2');
  }
}
