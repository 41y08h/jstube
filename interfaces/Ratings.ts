export default interface Ratings {
  count: {
    likes: number;
    dislikes: number;
  };
  userRatingStatus: "LIKED" | "DISLIKED" | null;
}
