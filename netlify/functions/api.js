import { GET } from "../../api/index.js"

export default async (request) => {
  return GET(request)
}

export const config = {
  path: "/api",
}
