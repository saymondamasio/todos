import { APIGatewayProxyHandler } from "aws-lambda"
import { document } from "src/utils/dynamodbClient"
import {v4 as uuid} from "uuid"

export const handle:APIGatewayProxyHandler = async event => {
  const { userId } = event.pathParameters

  const {title, deadline} = JSON.parse(event.body) 

  await document.put({
    TableName:'todos',
    Item:{
      id: uuid(),
      userId: userId,
      title,
      deadline: new Date(deadline),
      done: false
    },
  }).promise()

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'Todo created',
    })
  }
}