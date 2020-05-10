export function errorsToString(errors) {
  return Object.keys(errors).map(error => errors[error].join('<br>')).join('<br>');
}