import { FC, useState } from "react";

import Dropdown from "./Dropdown";


type CastCharactersProps = {
  cast: any;
  count: number;
  dropdow:boolean;
  emptymsg:boolean;
  size:string;
};

const CastCharacters: FC<CastCharactersProps> = ({size, cast, count,dropdow,emptymsg }) => {
  console.log("cast in character",cast)
  const placeholder =
    "https://static.tvmaze.com/uploads/images/medium_portrait/36/92099.jpg";
  const [show, setShow] = useState(false);
  count = Math.min(count, cast.length);
  let sizeClass ="";
  if(size==="small"){
    sizeClass = "h-10 md:h-12";
  }
  else {
    sizeClass ="h-16 md:h-20";
  }
  if (cast.length === 0) return emptymsg && <div className="text-white text-xl">Casts Not Available for this Show</div>;

  return (
    <>
      <div className="flex items-center justify-center relative mb-8  p-1 md:p-6 rounded-lg shadow-lg">
        {Array(count + 1)
          .fill(1)
          .map((item, index) => {
            return (
              <div key={index}>
                {index < count && (
                  <div
                    key={index}
                    className={"aspect-square rounded-full overflow-hidden border-4 border-white absolute shadow-xl transform hover:scale-110 transition-transform duration-300 ease-in-out "+sizeClass}
                    style={{
                      left: `${index * 50}px`,
                      zIndex: count - index,
                    }}
                  >
                    <img
                      src={cast[index].image?.medium || placeholder}
                      alt={cast[index].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {index >= count && cast.length - count > 0 && (
                  <button
                    onClick={() => {
                      setShow(!show);
                    }}
                    className={"  aspect-square rounded-full text-xs font-semibold text-center flex flex-col justify-center items-center bg-gradient-to-br from-yellow-500 to-red-500 text-white overflow-hidden border-4 border-black absolute shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out "+ sizeClass}
                    style={{ left: `${index * 50}px`, zIndex: count - index }}
                  >
                    <div>{cast.length - count}</div>
                    <div>more</div>
                  </button>
                )}
              </div>
            );
          })}
      </div>
      
     <Dropdown dropdown={dropdow} placeholder={placeholder} cast={cast} show={show} setShow={setShow}/>
    </>
  );
};

CastCharacters.defaultProps={
  size:"large",
}
export default CastCharacters;
