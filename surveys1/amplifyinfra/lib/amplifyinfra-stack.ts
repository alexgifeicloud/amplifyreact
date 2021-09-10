import * as codebuild from '@aws-cdk/aws-codebuild';
import * as amplify from '@aws-cdk/aws-amplify';
import * as cdk from '@aws-cdk/core';

export class AmplifyinfraStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const amplifyApp = new amplify.App(this, 'surveys1', {
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: 'alexgifeicloud@gmail.com',
        repository: 'amplifyreact',
        oauthToken: cdk.SecretValue.plainText('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')
      }),
      buildSpec: codebuild.BuildSpec.fromObjectToYaml({ // Alternatively add a `amplify.yml` to the repo
        version: '1.0',
        applications: {
          appRoot: 'surveys1',
          frontend: {
            phases: {
              preBuild: {
                commands: [
                  'npm install'
                ]
              },
              build: {
                commands: [
                  'npm run build'
                ]
              }
            },
            artifacts: {
              baseDirectory: 'build',
              files: '**/*'
            }
          }
          // ,
          // backend: {
          //   phases: {
          //     build: {
          //       commands:[
          //         'amplifyPush --simple'
          //       ]
          //     }
          //   }
          // }
        }
      })
    });

    const master = amplifyApp.addBranch('master'); // `id` will be used as repo branch name
    const dev = amplifyApp.addBranch('dev');
    dev.addEnvironment('STAGE', 'dev');
    master.addEnvironment('STAGE', 'master');
    master.addEnvironment('AMPLIFY_MONOREPO_APP_ROOT', 'surveys1');
    dev.addEnvironment('AMPLIFY_MONOREPO_APP_ROOT', 'surveys1');


  }
}
