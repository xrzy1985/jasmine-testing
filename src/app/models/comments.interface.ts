export interface Comments {
    body?: string;
    email: string;
    id: number;
    name?: string;
    postId: number;
    comment?: Comment
  }
  
  interface Comment {
    title?: string;
    body?: string;
  }