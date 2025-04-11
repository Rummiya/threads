import { Card } from "@components/shared/card"
import { CreateComment } from "@components/shared/create-comment"
import { BackBtn } from "@components/ui/button/back-btn"
import { useGetPostByIdQuery } from "@services/postApi"
import { useParams } from "react-router-dom"

export const CurrentPost = () => {
  const params = useParams<{ id: string }>()
  const { data } = useGetPostByIdQuery(params.id || "")

  if (!data) {
    return <h2>Поста не существует</h2>
  }

  const {
    id,
    author,
    authorId,
    likedByUser,
    content,
    comments,
    likes,
    createdAt,
    updateAt,
  } = data

  return (
    <>
      <BackBtn />
      <Card
        cardFor="current-post"
        id={id}
        authorId={authorId}
        name={author.name ?? ""}
        avatarUrl={author.avatarUrl ?? ""}
        content={content}
        likedByUser={likedByUser}
        commentsCount={comments.length}
        likesCount={likes.length}
        createdAt={createdAt}
        updatedAt={updateAt}
      />
      <div className="mt-10">
        <CreateComment />
      </div>
      <div className="mt-10">
        {data.comments.length ? (
          data.comments.map(comment => (
            <Card
              id={id}
              key={comment.id}
              cardFor="comment"
              name={comment.user.name ?? ""}
              authorId={comment.userId}
              avatarUrl={comment.user.avatarUrl || ""}
              content={comment.content}
              commentId={comment.id}
            />
          ))
        ) : (
          <div>Комментариев пока нет</div>
        )}
      </div>
    </>
  )
}
