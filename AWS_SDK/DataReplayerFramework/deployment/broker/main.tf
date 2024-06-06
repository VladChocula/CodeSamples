provider "aws" {
    region = "us-east-1"
    default_tags {
        tags = module.tags.map
    }
}

terraform {
    backend "s3" {
        bucket = "sro-tf-dev"
        key    = "tf-sport-event-replayer"
        region = "us-east-1"
    }
    required_providers {
        aws = {
            source = "hashicorp/aws"
            version = "~ 3.75.0"
        }
    }

}

data "aws_caller_identity" "current_aws_account" {}