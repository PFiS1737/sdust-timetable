import { useRouteError } from "react-router-dom"

export function RouteError() {
  const error = useRouteError()
  console.error(error)

  return (
    <div id="router-error" className="text-center">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        {/* @ts-ignore */}
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}
