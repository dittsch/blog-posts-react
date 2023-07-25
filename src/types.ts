export type AuthorType = {
  name: string; // Post author's name
  avatar?: string; // An url to the author's avatar (optional)
}

export type PostType = {
  id: number; // A unique id of the post
  author: AuthorType,
  created: number; // Timestamp when the post was created
  updated?: number; // Timestamp when the post was last updated (optional)
  title?: string; // Title of the post (optional)
  content: string; // Content of the post
}

export type Messages = {
  changed: PostType[],
  added: PostType[],
  deletedIds: number[]
}