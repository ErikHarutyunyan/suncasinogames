export const Card = ({data}) => {
  return (
    <a href={data.link} target="_blank" rel="noreferrer noopener">
      <div className="cardWrap">
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
      </div>
    </a>
  );
};
