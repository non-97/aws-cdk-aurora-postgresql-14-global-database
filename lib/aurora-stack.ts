import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Vpc } from "./constructs/vpc";
import { Ec2Instance } from "./constructs/ec2-instance";
import { Aurora } from "./constructs/aurora";

interface AuroraStackProps extends cdk.StackProps {
  isPrimaryDbCluster: boolean;
  globalClusterIdentifier: string;
}

export class AuroraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: AuroraStackProps) {
    super(scope, id, props);

    // VPC
    const vpc = new Vpc(this, "Vpc");

    new Ec2Instance(this, "Ec2Instance", {
      vpc: vpc.vpc,
      securityGroup: vpc.dbClientSg,
    });

    // Aurora
    new Aurora(this, "Aurora", {
      vpc: vpc.vpc,
      dbClusterSg: vpc.dbServerSg,
      isPrimaryDbCluster: props.isPrimaryDbCluster,
      globalClusterIdentifier: props.globalClusterIdentifier,
    });
  }
}
