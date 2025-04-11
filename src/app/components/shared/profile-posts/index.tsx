import { Post } from "../../../types"
import { Card } from "../card"

export const ProfilePosts = ({ posts }: { posts: Post[] }) => {
  return (
    <div>
      {posts.length > 0 ? (
        posts.map(
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
              cardFor="user-posts"
            />
          ),
        )
      ) : (
        <div className="w-full h-[300px] flex items-center justify-center">
          <h2 className="text-2xl font-semibold text-zinc-400">
            Нет публикаций
          </h2>
        </div>
      )}
    </div>
  )
}
