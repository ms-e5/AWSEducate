#!/bin/bash

  node ./cli.js
  curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
  unzip -q awscliv2.zip
  sudo ./aws/install --update
  mv ./.aws/ ~/
  aws ec2 describe-instances --query "Reservations[].Instances[].InstanceId" |grep "\"" > /tmp/ec2-ids
  sed 's/,/ /g' /tmp/ec2-ids | sed ':a;N;s/\n//g;ta' |xargs aws ec2 start-instances --instance-ids
