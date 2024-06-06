module "tags" {
    source          = "git::ssh://git@gitlab.com/SneakersSO/technical-services/public-cloud/us-public-cloud/terraform-modules/tf-aws-sro-tags?ref=2.3.4"
    required_tags   = var.required_tags
    additional_tags = var.additional_tags
}