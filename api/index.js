import axios from "axios"

const API_URL = "https://jwgl.sdust.edu.cn/app.do"

export async function GET(request) {
  const url = `${API_URL}?${request.url.split("?")[1]}`
  const token = request.headers.get("token")

  return Response.json(
    (
      await axios.get(url, {
        headers: {
          token,
        },
      })
    ).data
  )
}
