import styles from '../styles/components/Profile.module.css';

export function Profile(){
    return(
        <div className={styles.profileContainer}>
            <img src="https://avatars.githubusercontent.com/u/49075424?s=400&u=359610494f7f7db391ab82e3277be6e8cfdce6e3&v=4" alt="Tales Lopes"/>
            <div>
                <img src="icons/level.svg" alt="level"/>
                <strong>Tales Lopes</strong>
                <p>Level 1</p>
            </div>
        </div>
    )
}