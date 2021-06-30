const image = "/download.jpg";

export default function StoryBook() {
  return (
    <div style={{ width: "50%" }}>
      <div className="aspect-ratio">
        <img src={image} alt="aspect ratio demo" />
      </div>
    </div>
  );
}
