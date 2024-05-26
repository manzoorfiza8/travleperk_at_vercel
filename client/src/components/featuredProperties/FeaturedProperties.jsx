import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/hotels/get?featured=true&limit=4");

  return (
    <div className="fp grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {loading ? (
    "Loading"
  ) : (
    <>
      {data.map((item) => (
        <div className="fpItem border rounded-lg p-4" key={item._id}>
          <img
            src={item.photos[0]}
            alt=""
            className="fpImg w-full h-40 object-cover rounded-md mb-2"
          />
          <span className="fpName block text-lg font-semibold">{item.name}</span>
          <span className="fpCity block text-gray-600">{item.city}</span>
          <span className="fpPrice block text-green-500 font-semibold mt-1">
            Starting from ${item.cheapestPrice}
          </span>
          {item.rating && (
            <div className="fpRating flex items-center mt-2">
              <button className="bg-yellow-400 text-white py-1 px-2 rounded-md mr-2">
                {item.rating}
              </button>
              <span className="text-sm">Excellent</span>
            </div>
          )}
        </div>
      ))}
    </>
  )}
</div>

  );
};

export default FeaturedProperties;
