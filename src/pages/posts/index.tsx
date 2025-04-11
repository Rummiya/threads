import { Card } from "@components/shared/card"
import { CreatePost } from "@components/shared/create-post"
import { useGetAllPostsQuery } from "@services/postApi"

export const Posts = () => {
  const { data } = useGetAllPostsQuery()

  return (
    <>
      <div className="mb-10 w-full">
        <CreatePost />
      </div>
      {data && data.length > 0
        ? data.map(
            ({
              content,
              author,
              id,
              authorId,
              comments,
              likes,
              likedByUser,
              createdAt,
              updateAt,
            }) => (
              <Card
                key={id}
                id={id}
                authorId={authorId}
                name={author.name ?? ""}
                avatarUrl={author.avatarUrl ?? ""}
                content={content}
                likesCount={likes.length}
                commentsCount={comments.length}
                likedByUser={likedByUser}
                createdAt={createdAt}
                updatedAt={updateAt}
                cardFor="post"
              />
            ),
          )
        : null}
    </>
  )
}
