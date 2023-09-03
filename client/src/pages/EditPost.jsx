import { Form, Link, useLoaderData } from 'react-router-dom'
import { getPost } from '../api/posts'
import { getUsers } from '../api/users'

const EditPost = () => {
  const { post, users } = useLoaderData()
  const { state } = useNavigation()

  const isSubmitting = state === 'loading' || state === 'submitting'

  return (
    <div className="container">
      <h1 className="page-title">Edit Post</h1>
      <Form method="put" className="form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" value={post.title} />
          </div>
          <div className="form-group">
            <label htmlFor="userId">Author</label>
            <select name="userId" id="userId" defaultValue={post.userId}>
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
            <textarea name="body" id="body">
              {post.body}
            </textarea>
          </div>
        </div>
        <div className="form-row form-btn-row">
          <Link to={'..'} className="btn btn-outline">
            Cancel
          </Link>
          <button disabled={isSubmitting} className="btn">
            Save
          </button>
        </div>
      </Form>
    </div>
  )
}

async function loader({ request: { signal }, params: { postId } }) {
  const post = getPost(postId, { signal })
  const users = getUsers({ signal })

  return { post: await post, users: await users }
}

export const editPostRoute = {
  loader,
  element: <EditPost />,
}
