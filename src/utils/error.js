export function errorToString(error) {
  if (error) {
    return `
    <p>${error.message}</p>
  `
  }

  return `
    <p>There was a problem. Try again.</p>
  `
}