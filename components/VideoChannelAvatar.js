export default function VideoChannelAvatar({ picture, name }) {
  return (
    <div className="h-14 w-14 rounded-full overflow-hidden">
      <img className="object-cover w-full h-full" src={picture} alt={name} />
    </div>
  );
}
