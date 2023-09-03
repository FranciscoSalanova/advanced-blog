import {
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from 'react-router-dom'
import { getUsers } from '../api/users'
import { createPost } from '../api/posts'
import PostForm from '../components/PostForm'
import { postFormValidation } from '../validators'

const NewPost = () => {
  const users = useLoaderData()
  const { state } = useNavigation()
  const errors = useActionData()

  const isSubmitting = state === 'loading' || state === 'submitting'

  return (
    <div className="container">
      <h1 className="page-title">New Post</h1>
      <PostForm users={users} isSubmitting={isSubmitting} errors={errors} />
    </div>
  )
}

function loader({ request: { signal } }) {
  return getUsers({ signal })
}

async function action({ request }) {
  const formData = await request.formData()
  const title = formData.get('title')
  const body = formData.get('body')
  const userId = formData.get('userId')

  const errors = postFormValidation({ title, body, userId })

  if (Object.keys(errors).length > 0) {
    return errors
  }

  const post = await createPost(
    { userId, title, body },
    { signal: request.signal }
  )

  return redirect(`/posts/${post.id}`)
}

export const newPostRoute = {
  loader,
  action,
  element: <NewPost />,
}
