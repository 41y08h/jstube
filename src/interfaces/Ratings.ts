export default interface IRatings {
  count: {
    likes: number;
    dislikes: number;
  };
  userRatingStatus: "LIKED" | "DISLIKED" | null;
}
