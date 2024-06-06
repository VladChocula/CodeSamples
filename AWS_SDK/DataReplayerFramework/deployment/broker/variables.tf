variable metadata {
    type = map(string)

    default = {
        project = "us-platform"
        env     = "Dev"
    }
}

variable "additional_tags" {
    type        = map(any)
    description = "Arbitrary tags propagated to resources"
    default     = {}
}

variable "required_tags {
    type        = map(any)
    description = "Required tags propagated to resources"
    default     = {
        TEAM        = "mobile"
    }
}