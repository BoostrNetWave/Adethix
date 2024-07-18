import styles from "./InfoBox.module.css";

// eslint-disable-next-line react/prop-types
function InfoBox({ title, data }) {
  return (
    <div className={styles.itemContainer}>
      {title === "Revenue" ? (
        data === "No Revenue" ? (
          <h6 className={styles.data}>{data}</h6>
        ) : (
          <h6 className={styles.data}>${data}</h6>
        )
      ) : title === "CTR" ? (
        <h6 className={styles.data}>{data}%</h6>
      ) : (
        <h6 className={styles.data}>{data}</h6>
      )}
      <h6 className={styles.title}>{title}</h6>
    </div>
  );
}

export default InfoBox;
