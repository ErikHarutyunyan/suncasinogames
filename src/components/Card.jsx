import Tilt from "react-parallax-tilt";

export const Card = ({ data }) => {
  return (
    <a href={data.link} target="_blank" rel="noreferrer noopener">
      {/* <div className="cardWrap">
        <div className="card">
          <div
            className="cardBg"
            style={{
              backgroundImage: `url(${data.img})`
            }}
          ></div>
          <div className="cardInfo">
            <h3 className="cardTitle">{data.title}</h3>
            <p>{data.desc}</p>
          </div>
        </div>
      </div> */}

      <Tilt
        className="parallax-effect"
        perspective={500}
        glareEnable={true}
        glareMaxOpacity={0.45}
        scale={1.02}
        style={{
          backgroundImage: `url(${data.img})`,
        }}>
        <div className="inner-element cardInfo">
          <h3 className="cardTitle">{data.title}</h3>
          <p>{data.desc}</p>
        </div>
      </Tilt>
    </a>
  );
};
