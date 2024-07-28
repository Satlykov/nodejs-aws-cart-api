import {
  Stack,
  StackProps,
  CfnOutput,
  Duration,
  aws_lambda_nodejs,
  aws_lambda,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class NodejsAwsCartApi extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const server = new aws_lambda_nodejs.NodejsFunction(
      this,
      'NodejsAwsCartApiServerLambda',
      {
        functionName: 'NodejsAwsCartApiServerLambda',
        entry: 'dist/main.lambda.js',
        timeout: Duration.seconds(30),
        memorySize: 1024,
        runtime: aws_lambda.Runtime.NODEJS_18_X,
        environment: {
          RDS_CONNECTION_URL: process.env.RDS_CONNECTION_URL as string,
        },
        bundling: {
          externalModules: [
            '@nestjs/microservices',
            '@nestjs/websockets',
            'class-transformer',
            'class-validator',
          ],
        },
      },
    );

    const { url } = server.addFunctionUrl({
      authType: aws_lambda.FunctionUrlAuthType.NONE,
      cors: { allowedOrigins: ['*'] },
    });

    new CfnOutput(this, 'NodejsAwsCartApiUrlCnfOutput', { value: url });
  }
}
