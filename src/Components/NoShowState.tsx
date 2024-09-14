import { FC } from 'react';

type NoShowsStateProps={
  searchref:any;
}
const NoShowsState: FC<NoShowsStateProps> = ({searchref}) => {
  const placeHolder = "https://i.pinimg.com/564x/8e/a4/d5/8ea4d5b3ff7452f2a93dcb9d075b3b3e.jpg"
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black to-blue-900 p-6 rounded-lg">
      <h2 className="text-4xl font-extrabold text-white mb-6">No Shows Available Right Now</h2>
      <p className="text-lg text-gray-300 mb-8">It looks like we don’t have any shows that match your search. How about checking out some of our featured picks?</p>
      
      <div className="flex flex-wrap justify-center gap-6 mb-8">
        <div className="w-48 h-72 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <img
            src={placeHolder}
            alt="Poster 1"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-48 h-72 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <img
            src={placeHolder}
            alt="Poster 2"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-48 h-72 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <img
            src={placeHolder}
            alt="Poster 3"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-48 h-72 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <img
            src={placeHolder}
            alt="Poster 4"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <button 
      onClick={()=>searchref.current.focus()}
        className="bg-blue-600 text-white font-semibold rounded-lg px-6 py-3 hover:bg-blue-700 transition-colors"
      >
        Search Now
      </button>
    </div>
  );
};

export default NoShowsState;
