import { APIGatewayProxyHandler } from "aws-lambda"
import { document } from "src/utils/dynamodbClient"

export const handle:APIGatewayProxyHandler = async event => {
  const { userId } = event.pathParameters

  const response = await document.scan({
    TableName: "todos",
    FilterExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ':userId': userId
    }
  }).promise()

  const todos = response.Items

  return {
    statusCode: 200,
    body: JSON.stringify({
      todos: todos,
    })
  }
}