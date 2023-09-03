import { Form, Link, useLoaderData, useNavigation } from 'react-router-dom'
import { getUsers } from '../api/users'
import { checkTitle } from '../validators'
import { useEffect, useMemo, useRef, useState } from 'react'

const NewPost = () => {
  const users = useLoaderData()
  const { state } = useNavigation()
  const [title, setTitle] = useState('')
  // const [user, setUser] = useState('')
  // const [postBody, setPostBody] = useState('')
  const [isAfterFirstSubmit, setIsAfterFirstSubmit] = useState(false)
  const titleRef = useRef()

  useEffect(() => {
    titleRef.current.focus()
  }, [])

  const titleErrors = useMemo(() => {
    return isAfterFirstSubmit ? checkTitle(title) : []
  }, [isAfterFirstSubmit, title])

  const isSubmitting = state === 'loading' || state === 'submitting'

  function handleSubmit(e) {
    if (titleErrors.length > 0) e.preventDefault()
    return setIsAfterFirstSubmit(true)
  }

  return (
    <div className="container">
      <h1 className="page-title">New Post</h1>
      <Form method="post" className="form">
        <div className="form-row">
          {console.log(titleErrors.length)}
          <div
            className={`form-group ${titleErrors.length > 0 ? 'error' : ''}`}
          >
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              ref={titleRef}
            />
            {/* {console.log(title)} */}
            <div className="error-message">Required</div>
          </div>
          <div className="form-group">
            <label htmlFor="userId">Author</label>
            <select name="userId" id="userId">
              {users.map((user) => (
                <option key={user.id} value={user.id} id="userId">
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="body">Body</label>
            <textarea name="body" id="body"></textarea>
          </div>
        </div>
        <div className="form-row form-btn-row">
          <Link to={'..'} className="btn btn-outline">
            Cancel
          </Link>
          <button
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="btn"
          >
            Save
          </button>
        </div>
      </Form>
    </div>
  )
}

function loader({ request: { signal } }) {
  return getUsers({ signal })
}

export const newPostRoute = {
  loader,
  element: <NewPost />,
}
