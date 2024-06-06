resource "aws_dynamodb_table" "sports_event_replayer_table" {
    name        = "${var.metadata["project"]}-${var.metadata["env"]}-event-replayer"
    billing_mode        = "PAY_PER_REQUEST"
    hash_key            = "environment"
    range_key           = "delivery_time"

    attribute {
        name = "environment"
        type = "S"
    }

    attribute {
        name = "delivery_time"
        type = "N"
    }

    ttl {
        attribute_name = "ttl"
        enabled        = true
    }
}