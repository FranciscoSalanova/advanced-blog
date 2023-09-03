export function checkTitle(title) {
  const errors = []

  if (title.length === 0) {
    errors.push('Required')
  }

  return errors
}
