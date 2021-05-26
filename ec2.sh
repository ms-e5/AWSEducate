#!/bin/bash

aws ec2 describe-instances --query "Reservations[].Instances[].InstanceId" |grep "\"" > /tmp/ec2-ids
sed 's/,/ /g' /tmp/ec2-ids | sed ':a;N;s/\n//g;ta' |xargs aws ec2 start-instances --instance-ids