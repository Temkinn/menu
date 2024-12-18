import styles from "./styles.module.css"

export default function Header({black, milk, other, tea, breakfast}){
	return (
        <header className={styles.header}>
            <h1 className={styles.title}>Наше меню</h1>
            <div className={styles.buttons}>
				<div className={styles.up}>
					<div className={styles.button}><a href="#black">Black</a></div>
					<div className={styles.button}><a href="#milk">Milk</a></div>
					<div className={styles.button}><a href="#other">Other</a></div>
				</div>
				<div className={styles.down}>
					<div className={styles.button}><a href="#tea">Tea</a></div>
					<div className={styles.button}><a href="#breakfast">Завтраки</a></div>
					<div className={styles.button}><a href="#sweet">Сладкое</a></div>
				</div>
			</div>
        </header>
    )
}