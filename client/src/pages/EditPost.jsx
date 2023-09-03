import { useLoaderData, useNavigation } from 'react-router-dom'
import { getPost, updatePost } from '../api/posts'
import { getUsers } from '../api/users'
import PostForm from '../components/PostForm'

const EditPost = () => {
  const { post, users } = useLoaderData()
  const { state } = useNavigation()
  const errors = useActionData()

  const isSubmitting = state === 'loading' || state === 'submitting'

  return (
    <div className="container">
      <h1 className="page-title">Edit Post</h1>
      <PostForm
        users={users}
        defaultValues={post}
        isSubmitting={isSubmitting}
        errors={errors}
      />
    </div>
  )
}

async function loader({ request: { signal }, params: { postId } }) {
  const post = getPost(postId, { signal })
  const users = getUsers({ signal })

  return { post: await post, users: await users }
}

async function action({ request, params: { postId } }) {
  const formData = await request.formData()
  const title = formData.get('title')
  const body = formData.get('body')
  const userId = formData.get('userId')

  const errors = postFormValidation({ title, body, userId })

  if (Object.keys(errors).length > 0) {
    return errors
  }

  const post = await updatePost(
    postId,
    { userId, title, body },
    { signal: request.signal }
  )

  return redirect(`/posts/${post.id}`)
}

export const editPostRoute = {
  loader,
  action,
  element: <EditPost />,
}
