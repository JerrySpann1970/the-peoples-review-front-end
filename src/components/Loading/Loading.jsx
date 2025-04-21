import styles from './Loading.module.css'
import LogoIcon from '../../assets/images/logo.jpg';

const Loading = () => {
    return (
        <main className={styles.container}>
            <img src={LogoIcon} alt='company Logo The Peoples Review' />
        </main>
    )
}

export default Loading