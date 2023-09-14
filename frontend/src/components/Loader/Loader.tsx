import LoaderLogo from "assets/loader.svg"
import styles from "./Loader.module.css"

export const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <img src={LoaderLogo} alt="loader" />
    </div>
  )
}
