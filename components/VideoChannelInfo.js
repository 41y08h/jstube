import formatNumber from "../lib/formatNumber";

export default function VideoChannelInfo({ data }) {
  return (
    <div className="flex pt-4 justify-between">
      <div className="flex space-x-4 ">
        <div className="h-14 w-14 rounded-full overflow-hidden">
          <img
            className="object-cover w-full h-full"
            src={data.picture}
            alt={data.name}
          />
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-sm font-medium">{data.name}</span>
          <span className="text-sm text-secondary">
            {formatNumber(data.subscribers)} subscribers
          </span>
        </div>
      </div>
      <button className="uppercase bg-red-500 rounded p-2 text-white">
        Subscribe
      </button>
    </div>
  );
}
