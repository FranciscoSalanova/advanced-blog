export function postFormValidation({ title, body, userId }) {
  const errors = {}

  if (title === '') {
    errors.title = 'Required'
  }

  if (body === '') {
    errors.body = 'Required'
  }

  if (userId === '') {
    errors.userId = 'Required'
  }

  return errors
}
