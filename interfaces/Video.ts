export default interface Video {
  id: number;
  title: string;
  description: string;
  src: string;
  thumbnail: string;
  duration: number;
  userId: number;
  views: number | null;
  uploadedAt: Date;
  updatedAt: Date;
}
