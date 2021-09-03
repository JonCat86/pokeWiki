import statbg from "../assets/modal-bg3.jpg";

const Modal = ({ modalPokemon, closeModal }) => {
  const {
    height,
    id,
    name,
    weight,
    sprites,
    types,
    habitat,
    flavor_text,
    category,
    stats,
  } = modalPokemon;

  const handleClick = () => {
    closeModal();
  };

  return (
    <div className="modal-container">
      <div className="modal-main">
        <div className="modal-main-box">
          <img
            className="modal-img"
            src={sprites.other["official-artwork"].front_default}
            alt={name}
          />
          <h1>
            #{id} <span>{name}</span>
          </h1>
        </div>
      </div>
      <div className="modal-info">
        <div className="modal-info-box">
          <div className="modal-info-flavor">
            <p>{flavor_text}</p>
          </div>
          <div className="modal-info-minibox">
            <p>
              <b>Height:</b>
              <br />
              <span className="modal-info-text">{height / 10} m</span>
            </p>
            <p>
              <b>Weight:</b>
              <br />
              <span className="modal-info-text">{weight / 10} kg</span>
            </p>
            <p>
              <b>Habitat:</b>
              <br />
              <span className="modal-info-text">{habitat}</span>
            </p>
            <p>
              <b>Category:</b>
              <br />
              <span className="modal-info-text">{category}</span>
            </p>
            <div className="modal-types-box">
              {types.map((type, index) => (
                <div className={`modal-type ${type.type.name}`} key={index}>
                  {type.type.name.charAt(0).toUpperCase() +
                    type.type.name.slice(1)}
                </div>
              ))}
            </div>
          </div>
          <div className="modal-stats-box">
            <h2 className="stats-title">Base Stats</h2>
            <div className="modal-stats">
              {stats.map((stat, index) => (
                <div
                  className={`stat ${stat.stat.name}`}
                  key={index}
                  style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255, .79) ${
                      100 - (stat.base_stat * 100) / 250
                    }%, transparent ${
                      100 - (stat.base_stat * 100) / 250
                    }%), url(${statbg})`,
                  }}
                >
                  <p>{stat.stat.name.replace("-", " ")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <button className="modal-btn" onClick={handleClick}>
        X
      </button>
    </div>
  );
};

export default Modal;
