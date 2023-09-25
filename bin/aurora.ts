#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { AuroraStack } from "../lib/aurora-stack";

const app = new cdk.App();

const GLOBAL_CLUSTER_IDENTIFIER = "global-database";

new AuroraStack(app, "AuroraStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  isPrimaryDbCluster: true,
  globalClusterIdentifier: GLOBAL_CLUSTER_IDENTIFIER,
});

new AuroraStack(app, "AuroraSecondaryStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: "us-east-2",
  },
  isPrimaryDbCluster: false,
  globalClusterIdentifier: GLOBAL_CLUSTER_IDENTIFIER,
});
