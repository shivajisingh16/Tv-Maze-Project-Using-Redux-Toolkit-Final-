import { FC, useRef } from "react";
import SearchBar from "../Components/SearchBar";
import ShowCard from "../Components/ShowCard";
import { ShowsQueryChangeAction } from "../actions/Shows";
import { connect, ConnectedProps } from 'react-redux';
import { castsMapSelector, showsLoadingSelector, showsQuerySelector, showsSelector } from "../selectors/Shows";
import LoadingSpinner from "../Components/LoadingSpinner";
import { State } from "../store";
import EmptyState from "../Components/NoShowState";

type ShowListPageProps = {} & ReduxProps;

const ShowListPage: FC<ShowListPageProps> = ({ loading, showsQueryChange, query, shows }) => {
  const searchref = useRef(null);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-white py-6">
      {/* Search Bar Section */}
      <div className="container mx-auto md:px-4">
        <div className="max-w-3xl mx-auto w-96 flex gap-2 justify-center items-center">
          <SearchBar
            searchref={searchref}
            value={query}
            onChange={(event) => showsQueryChange(event.target.value)}
            placeholder="Search for shows..."
            className=" p-2 text-lg border-2 border-gray-300 rounded-lg shadow-lg bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 focus:outline-none focus:border-blue-500 transition-all  md:min-w-[500px]"
          />
          <div className="p-6 h-10 w-10 relative">{loading && <LoadingSpinner className="relative bottom-4 right-4 items-center
           w-8 h-8 text-black" />}</div>
        </div>
      </div>

      {/* Show Loading Spinner or Cards */}
      <div className="container mx-auto px-4 mt-6">
        {!shows && loading && (
          <div className="flex justify-center items-center h-96">
            <LoadingSpinner className="w-12 h-12 text-blue-600" />
          </div>
        )}
        
        {!query ? <EmptyState searchref={searchref} /> : (
          <>
            {!loading && shows && shows.length === 0 && (
              <div className="text-center mt-12">
                <h2 className="text-3xl font-bold text-white mb-4">No Shows Found</h2>
                <p className="text-white">Try searching for something else or check back later!</p>
              </div>
            )}

            {!loading && shows && shows.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {shows.map((show) => (
                  <ShowCard
                    key={show.id}
                    show={show}
                   
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
});

const mapDispatchToProps = {
  showsQueryChange: ShowsQueryChangeAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(ShowListPage);
