import { FC, useRef } from "react";
import SearchBar from "../Components/SearchBar";
import ShowCard from "../Components/ShowCard";
import { connect, ConnectedProps } from 'react-redux';
import {  castsMapSelector, showsLoadingSelector, showsQuerySelector, showsSelector } from "../selectors/Shows";
import LoadingSpinner from "../Components/LoadingSpinner";
import { State } from "../store";
import NoShowState from "../Components/NoShowState";
import { ShowsQueryChangeAction } from "../slices/shows";

type ShowListPageProps = {} & ReduxProps;

const ShowListPage: FC<ShowListPageProps> = ({ loading, showsQueryChange, query, shows ,casts}) => {
  const searchref = useRef(null);
  console.log(loading)
  return (
    <div className="min-h-screen md:px-24 bg-gradient-to-r from-black  via-gray-500 to-black py-6">
      {/* Search Bar Section */}
      <div className="container mx-auto md:px-4 mb-12 fixed left-0 z-10 ">
        <div className="max-w-3xl mx-auto w-96 flex gap-2 justify-center items-center">
          <SearchBar
            searchref={searchref}
            value={query.toUpperCase()}
            onChange={(event) => showsQueryChange(event.target.value)}
            placeholder="Search for shows..."
            className=" p-2 text-lg border-2 border-gray-300 rounded-lg shadow-lg bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 focus:outline-none focus:border-blue-500 transition-all  md:min-w-[500px]"
          />
          <div className="p-6 h-10 w-10 relative">{loading && <LoadingSpinner className="relative bottom-4 right-4 items-center
           w-8 h-8 text-white md:text-black" />}</div>
        </div>
      </div>

      {/* Show Loading Spinner or Cards */}
      <div className="container mx-auto px-4 mt-24">
        {!shows && loading && (
          <div className="flex justify-center items-center h-96">
            <LoadingSpinner className="w-12 h-12 text-blue-600" />
          </div>
        )}
        
        {!query ? <NoShowState searchref={searchref} /> : (
          <>
            {!loading  && shows?.length ===0 &&  (
              <div className="text-center mt-12">
                <h2 className="text-3xl font-bold text-white mb-4">No Shows Found</h2>
                <p className="text-white">Try searching for something else or check back later!</p>
              </div>
            )}

            {!loading && Object.keys(casts).length!=0 && shows?.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {shows.map((show) => (
                  <ShowCard
                    key={show.id}
                    show={show}
                    cast={casts[show.id]!}
                    // className="transform hover:scale-105 transition-transform duration-300 bg-white rounded-lg shadow-lg overflow-hidden"
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  query: showsQuerySelector(state),
  shows: showsSelector(state),
  loading: showsLoadingSelector(state),
  casts:castsMapSelector(state),
});

const mapDispatchToProps = {
  showsQueryChange: ShowsQueryChangeAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(ShowListPage);
