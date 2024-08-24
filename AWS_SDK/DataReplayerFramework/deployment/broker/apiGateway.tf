resource "aws_api_+gateway_rest_api" "dynamo_handler_api" {
    name = "${var.metadata["project"]}-${var.metadata["env"]}-dynamo-handler"
    description = "API for returning dynamoDB records needed for the sports data replayer"

    endpoint_configuration {
        types = ["REGIONAL"]
    }
}

resource "aws_api_gateway_resource" "dynamo_handler_resource" {
    rest_api_id = aws_api_gateway_rest_api.dynamo_handler_api.id
    parent_id   = aws_api_gateway_rest_api.dynamo_handler_api.root_resource_id
    path_part   = "messages"
}

resource "aws_api_gateway_method" "dynamo_handler_get_method" {
    rest_api_id     = aws_api_gateway_rest_api.dynamo_handler_api.id
    resource_id     = aws_api_gateway_resource.dynamo_handler_resource.id
    http_method     = "GET"
    authorization   = "NONE"
    api_key_required    = true
    request_parameters = {
        "method.request.path.proxy" = true
    }
}

resource "aws_api_gateway_method" "dynamo_handler_options_method" {
    rest_api_id     = aws_api_gateway_rest_api.dynamo_handler_api.id
    resource_id     = aws_api_gateway_resource.dynamo_handler_resource.id
    http_method     = "OPTIONS"
    authorization   = "NONE"
}

resource "aws_api_gateway_integration" "dynamo_handler_get_integration" {
    rest_api_id     = aws_api_gateway_rest_api.dynamo_handler_api.parent_id
    resource_id     = aws_api_gateway_resource.dynamo_handler_resource.id
    http_method     = "POST"
    type            = "AWS_PROXY"
    uri             = aws_lambda_function.dynamo_handler_lambda.invoke_arn
    request_parameters      = {
        "integration.request.path.proxy" = "method.request.path.proxy"
    }
}

resource "aws_api_gateway_integration" "dynamo_handler_api_options_integration" {
  rest_api_id = aws_api_gateway_rest_api.dynamo_handler_api.id
  resource_id = aws_api_gateway_resource.dynamo_handler_resource.id
  http_method = aws_api_gateway_method.dynamo_handler_options_method.http_method
  type = "MOCK"
  request_templates = {
    "application/json" = <<EOF
      {"statusCode":200}
    EOF
  }
}

resource "aws_api_gateway_method_response" "dynamo_handler_api_gateway_options_response_200" {
  rest_api_id = aws_api_gateway_rest_api.dynamo_handler_api.id
  resource_id = aws_api_gateway_resource.dynamo_handler_resource.id
  http_method = aws_api_gateway_method.dynamo_handler_options_method.http_method
  status_code = "200"
  response_models = {
    "application/json" = "Empty"
  }
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true,
    "method.response.header.Access-Control-Allow-Methods" = true,
    "method.response.header.Access-Control-Allow-Origin" = true
  }
}

resource "aws_api_gateway_integration_response" "dynamo_handler_options_integration_response" {
  rest_api_id   = aws_api_gateway_rest_api.dynamo_handler_api.id
  resource_id   = aws_api_gateway_resource.dynamo_handler_resource.id
  http_method   = aws_api_gateway_method.dynamo_handler_options_method.http_method
  status_code   = aws_api_gateway_method_response.dynamo_handler_api_gateway_options_response_200.status_code
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-NJD-SPORTSBOOK-APP-ENV'",
    "method.response.header.Access-Control-Allow-Methods" = "'GET,OPTIONS,POST,PUT'",
    "method.response.header.Access-Control-Allow-Origin" = "'*'"
  }
  depends_on = [aws_api_gateway_method_response.dynamo_handler_api_gateway_options_response_200]
}

resource "aws_api_gateway_deployment" "dynamo_handler_deployment" {
  depends_on = [aws_api_gateway_integration.dynamo_handler_api_options_integration,
    aws_api_gateway_integration.dynamo_handler_get_integration]
  rest_api_id = aws_api_gateway_rest_api.dynamo_handler_api.id
  stage_name  = "event-broker"
}

resource "aws_api_gateway_usage_plan" "dynamo_handler_usage_plan" {
  name         = "dynamo-handler-usage-plan"
  description  = "Usage plan for the dynamo handler API for sports data replayer"

  api_stages {
    api_id = aws_api_gateway_rest_api.dynamo_handler_api.id
    stage  = aws_api_gateway_deployment.dynamo_handler_deployment.stage_name
  }
}