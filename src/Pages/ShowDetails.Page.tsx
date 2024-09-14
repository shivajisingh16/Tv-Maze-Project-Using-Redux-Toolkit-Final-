import { FC, useEffect } from "react";

import GenrePill from "../Components/GenrePill";
import withRouter, { WithRouterProps } from "../hocs/withRouter";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { State } from "../store";
import { connect, ConnectedProps } from "react-redux";
import { castsMapSelector, showsLoadingSelector, showsMapSelector } from "../selectors/Shows";
import { placeHolder } from "../Components/ShowCard";
import CastCharacters from "../Components/CastCharacters";
import { loadShowAction ,loadCastAction} from "../slices/shows";

type ownProps = {} & WithRouterProps;
type ShowDetailPageProps = ReduxProps & ownProps;

const ShowDetailPage: FC<ShowDetailPageProps> = ({
  params,
  show,
  loadShow,
  loadCast,
  cast,
  loading
}) => {
  console.log("cast in detail", cast);

  useEffect(() => {
    if (!show || !cast) {
     
      loadShow(+params.show_id);
      loadCast(+params.show_id);
    }
  }, [+params.show_id]);
  if (loading)
    return <div className="text-white text-xl">Loading...</div>;
  if (!show || !cast)
    return (
      <div className="h-screen grid place-items-center bg-gradient-to-r from-black  via-gray-500 to-black">
        <div className="text-center mt-12">
          <h2 className="text-3xl font-bold text-white mb-4">Show Not Found</h2>
          <p className="text-white">
            Try Again or check back later!
          </p>
        </div>
      </div>
    );

  return (
    <div className=" bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 min-h-screen text-white p-5 md:p-10">
      {/* Back Button */}
      <Link
        className="flex items-center w-fit text-lg font-semibold bg-gradient-to-r from-purple-500 to-indigo-500 text-gray-200 hover:text-white hover:bg-green-500  px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
        to={"/"}
      >
        <IoArrowBack className="mr-2 text-2xl" />
        Back
      </Link>

      {/* Show Title */}
      <h2 className="text-5xl font-bold tracking-wide text-gray-100 my-4 ">
        {show.name.toUpperCase()}
      </h2>

      {/* Genre Pills */}
      <div className="flex space-x-3 my-4 p-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-lg shadow-lg">
        {show.genres.map((genre, idx) => (
          <GenrePill name={genre} key={idx} />
        ))}
      </div>

      {/* Show Information */}
      <div className="mt-6 flex flex-col md:flex-row md:space-x-6 bg-gradient-to-br from-black to-blue-900 p-6 rounded-lg shadow-xl">
        {/* Show Image */}
        <img
          src={show.image?.medium || placeHolder}
          alt={show.name}
          className="object-cover object-center  md:w-[300px]  rounded-lg transition-transform transform hover:scale-105 duration-300 ease-in-out w-64"
        />

        {/* Show Summary and Rating */}
        <div className="mt-4 md:mt-0 md:w-1/2 text-lg text-gray-300">
          <p
            dangerouslySetInnerHTML={{
              __html: show.summary || "This is a good Show.",
            }}
          ></p>
          <p className="mt-6 text-xl font-bold border border-gray-700 rounded-md px-4 py-2 inline-block bg-gray-700">
            Rating:{" "}
            <span className="text-yellow-400">
              {show.rating.average ? show.rating.average : 5}/10
            </span>
          </p>
        </div>
      </div>

      {/* Cast Section */}
      <div className="mt-12">
        <h4 className="text-3xl font-semibold tracking-wide text-white mb-6">
          Cast
        </h4>

        {/* Cast Cards with Gradient Background */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 md:p-8 rounded-lg shadow-2xl">
          <CastCharacters
            size={"large"}
            dropdow={true}
            count={3}
            cast={cast}
            emptymsg={true}
          />
        </div>
      </div>
    </div>
  );
};

// Redux Connection and Export
const mapStateToProps = (state: State, ownProps: WithRouterProps) => {
  return {
    show: showsMapSelector(state)[+ownProps.params.show_id],
    cast: castsMapSelector(state)[+ownProps.params.show_id],
    loading :showsLoadingSelector(state),
  };
};

const mapDispatchToProps = {
  loadShow: loadShowAction,
  loadCast: loadCastAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type ReduxProps = ConnectedProps<typeof connector>;
export default withRouter(connector(ShowDetailPage));
