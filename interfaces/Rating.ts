export default interface Rating {
  likes: number;
  dislikes: number;
  userRatingStatus: "LIKED" | "DISLIKED" | null;
}
