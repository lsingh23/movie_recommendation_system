import React from "react";

const PosterCard = ({ movie, onChange }) => {
  //   const [isShown, setIsShown] = useState(false)

  const handleChange = () => {
    onChange(movie[0]);
  };

  return (
    //     <div className="card">
    //     <video className="video">
    //       <source src={movie.thumbnail} type="video/mp4" />
    //     </video>
    //     <div>{movie.title}</div>
    //   </div>

    <div
      className="card"
      onClick={handleChange}
      //   onMouseEnter={() => setIsShown(true)}
      //   onMouseLeave={() => setIsShown(false)}
    >
      {/* {!isShown && (
        <video className="video" controls>
          <source src={movie.thumbnail} type="video/mp4" />
        </video>
      )} */}

      {
        <>
          {/* <video className="video" controls autoPlay={true} loop>
            <source src={movie.thumbnail} type="video/mp4" />
          </video> */}
          <div className="info-box">
            <p>{movie[0]}</p>
            <img src={movie[1]} className="img"></img>
          </div>
        </>
      }
    </div>
  );
};

export default PosterCard;
