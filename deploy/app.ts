import * as cdk from 'aws-cdk-lib';

import { NodejsAwsCartApi } from './stack';

const app = new cdk.App({});

new NodejsAwsCartApi(app, 'nodejs-aws-cart-api', {});
