import { Form, Link, useLoaderData } from 'react-router-dom'
import { PostCard } from '../components/PostCard'
import { useEffect, useRef } from 'react'
import { getUsers } from '../api/users'
import { getPosts } from '../api/posts'

function PostList() {
  const {
    users,
    posts,
    filteredPosts,
    searchParams: { query },
  } = useLoaderData()
  const queryRef = useRef()

  useEffect(() => {
    queryRef.current.value = query
  }, [query])

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
      <Form method="get" className="form mb-4">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="query">Query</label>
            <input type="search" name="query" id="query" ref={queryRef} />
          </div>
          <div className="form-group">
            <label htmlFor="userId">Author</label>
            <select type="search" name="userId" id="userId" defaultValue="">
              <option value="">Any</option>
              {users.map((user) => (
                <option key={user.id} value={user.id} id="userId">
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <button className="btn">Filter</button>
        </div>
      </Form>
      <div className="card-grid">
        {filteredPosts === []
          ? filteredPosts.map((post) => <PostCard key={post.id} {...post} />)
          : posts.map((post) => <PostCard key={post.id} {...post} />)}
      </div>
    </>
  )
}

async function loader({ request: { signal, url } }) {
  const searchParams = new URL(url).searchParams
  const query = searchParams.get('query')
  const userId = searchParams.get('userId')
  const users = await getUsers({ signal })
  const posts = await getPosts({ request: { signal } })
  let filteredPosts = []

  if (userId !== '') {
    filteredPosts = await fetch(
      `http://localhost:3000/posts?q=${query}&userId=${userId}`,
      { request: { signal } }
    ).then((res) => res.json())
  }

  return { searchParams: { query }, posts, filteredPosts, users }
}

export const postListRoute = {
  loader,
  element: <PostList />,
}
