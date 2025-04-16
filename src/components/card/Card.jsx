import styles from "./Card.module.css";

const Card = ({ pokemon }) => {
  return (
    <>
      <div className={styles.card}>
        <img
          className={styles.img}
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />
        <p className={styles.pkmnName}>{pokemon.name}</p>
      </div>
    </>
  );
};

export default Card;
