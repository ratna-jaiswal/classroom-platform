export interface Doubt {
  _id: string;
  title: string;
  description: string;
  author: {
    id: string;
    name: string;
  };
  subject: string;
  topic?: string;
  mentionedFaculty?: string;
  likes: number;
  replies: number;
  status: 'Open' | 'Answered' | 'Closed';
  createdAt: string;
  updatedAt: string;
}

export default Doubt;