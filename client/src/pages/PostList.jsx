import { Form, Link, useLoaderData } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { PostCard } from '../components/PostCard'
import { getUsers } from '../api/users'
import { getPosts } from '../api/posts'
import FormGroup from '../components/FormGroup'

function PostList() {
  const {
    users,
    posts,
    filteredPosts,
    searchParams: { query, userId },
  } = useLoaderData()
  const queryRef = useRef()
  const userIdRef = useRef()

  useEffect(() => {
    queryRef.current.value = query || ''
  }, [query])

  useEffect(() => {
    userIdRef.current.value = userId || ''
  }, [userId])

  return (
    <>
      <h1 className="page-title">
        Posts
        <div className="title-btns">
          <Link to={'new'} className="btn btn-outline">
            New
          </Link>
        </div>
      </h1>
      <Form className="form mb-4">
        <div className="form-row">
          <FormGroup>
            <label htmlFor="query">Query</label>
            <input type="search" name="query" id="query" ref={queryRef} />
          </FormGroup>
          <FormGroup>
            <label htmlFor="userId">Author</label>
            <select
              type="search"
              name="userId"
              id="userId"
              defaultValue=""
              ref={userIdRef}
            >
              <option value="">Any</option>
              {users.map((user) => (
                <option key={user.id} value={user.id} id="userId">
                  {user.name}
                </option>
              ))}
            </select>
          </FormGroup>
          <button className="btn">Filter</button>
        </div>
      </Form>
      <div className="card-grid">
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </>
  )
}

async function loader({ request: { signal, url } }) {
  const searchParams = new URL(url).searchParams
  const query = searchParams.get('query')
  const userId = searchParams.get('userId')
  const filterParams = { q: query }
  if (userId !== '') filterParams.userId = userId

  const posts = getPosts({ signal, params: filterParams })
  const users = getUsers({ signal })

  return {
    signal,
    params: filterParams,
    searchParams: { query, userId },
    posts: await posts,
    users: await users,
  }
}

export const postListRoute = {
  loader,
  element: <PostList />,
}
