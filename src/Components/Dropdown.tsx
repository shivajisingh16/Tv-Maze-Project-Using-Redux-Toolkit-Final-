import { FC, memo } from 'react';
import { Cast, Show } from '../models/Show';

type DropdownProps = {
  cast:Cast[];
  show:boolean;
  setShow:(x:boolean)=>void;
  placeholder:string;
  dropdown:boolean
};

const Dropdown: FC<DropdownProps> = ({cast,show,setShow,placeholder,dropdown}) => {
  return (
    <>
      {show&& dropdown && (
        <div className="p-4 md:p-8 bg-gradient-to-b from-gray-900 to-gray-700 text-white font-bold flex flex-col items-center justify-center rounded-lg shadow-2xl transition-all duration-500 ease-in-out transform translate-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full">
            {cast.map((member) => (
              <div
                className="flex flex-col items-center bg-gradient-to-t from-purple-600 to-indigo-600 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-2"
                key={member.id}
              >
                <div className="aspect-square h:16  md:h-20 rounded-full overflow-hidden shadow-lg mb-4">
                  <img src={member.image?.medium || placeholder} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className="text-center text-white font-medium">
                  {member.name}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setShow(false)}
            className="mt-8 px-6 py-2 bg-red-600 rounded-full text-white font-semibold shadow-lg hover:bg-red-700 transition-colors duration-300 ease-in-out"
          >
            Close
          </button>
        </div>
      )}
    </>
  );
};

Dropdown.defaultProps = {};

export default memo(Dropdown);