import { Form, Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import FormGroup from './FormGroup'

const PostForm = ({ users, isSubmitting, defaultValues = {}, errors = {} }) => {
  const titleRef = useRef()

  useEffect(() => {
    titleRef.current.focus()
  }, [])

  return (
    <Form method="post" className="form">
      <div className="form-row">
        <FormGroup errorMessage={errors.title}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            ref={titleRef}
            defaultValue={defaultValues.title}
          />
        </FormGroup>
        <FormGroup errorMessage={errors.userId}>
          <label htmlFor="userId">Author</label>
          <select name="userId" id="userId" defaultValue={defaultValues.userId}>
            {users.map((user) => (
              <option key={user.id} value={user.id} id="userId">
                {user.name}
              </option>
            ))}
          </select>
        </FormGroup>
      </div>
      <div className="form-row">
        <FormGroup errorMessage={errors.body}>
          <label htmlFor="body">Body</label>
          <textarea
            name="body"
            id="body"
            defaultValue={defaultValues.body}
          ></textarea>
        </FormGroup>
      </div>
      <div className="form-row form-btn-row">
        <Link to={'..'} className="btn btn-outline">
          Cancel
        </Link>
        <button disabled={isSubmitting} className="btn">
          {isSubmitting ? 'Saving...' : 'Save'}
        </button>
      </div>
    </Form>
  )
}

export default PostForm
