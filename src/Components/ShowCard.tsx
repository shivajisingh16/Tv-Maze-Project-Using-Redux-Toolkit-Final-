import { Link } from "react-router-dom";
import { Cast, Show } from "../models/Show";
import { FC } from "react";
import CastCharacters from "./CastCharacters";

type ShowCardProps = {
  show: Show;
  cast: Cast[];
};

export const placeHolder =
  "https://postshowrecaps.com/wp-content/uploads/2023/11/PSR_PLACEHOLDER_4_BATTLESTARGALACTICA_DTH-1-848x430.jpg";

const ShowCard: FC<ShowCardProps> = ({ show, cast }) => {
  return (
    <div className="max-w-sm w-full rounded-lg shadow-lg  transform border-4 border-whitetransition-transform duration-300 hover:scale-105 hover:shadow-2xl mx-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <img
        src={show.image?.medium || placeHolder}
        alt={show.name}
        className="w-full h-56 object-contain object-center"
      />
      <div className="flex flex-col p-4 bg-gradient-to-br from-blue-800 to-black text-white justify-between h-60 gap-2">
        <div className="overflow-scroll">
        <h2 className="text-xl font-bold mb-2 tracking-widest">
          {show.name.toUpperCase()}
        </h2>
        <div className=" relative bottom-2">
          <CastCharacters
            size={"small"}
            dropdow={false}
            emptymsg={false}
            cast={cast}
            count={3}
          />
        </div>
        <p
          className="mb-4 text-gray-400 line-clamp-5 grow "
          dangerouslySetInnerHTML={{
            __html: show.summary! || "No description available.",
          }}
        ></p>
        </div>

        <div className="mt-auto">
          <Link
            to={`/show/${show.id}`}
            className="block text-center text-blue-500 font-semibold border border-blue-500 rounded-md px-4 py-2 transition-colors duration-300 hover:bg-blue-500 hover:text-white"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShowCard;
