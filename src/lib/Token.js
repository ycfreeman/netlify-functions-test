import _ from "lodash";
import { createResponse } from "../formatter";

export async function handler(event, context) {
  return createResponse(
    {
      statusCode: 200,
      body: "7a75e9c5-b6d4-4f4c-bc6d-67a1cf34ecdd"
    },
    event.headers
  );
}
