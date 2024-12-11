import styleses from './styles.module.css'
import photos from "./../../menuPhotos/photos.jsx"
import cross from "./../../assets/cross.png"

import { useEffect } from 'react'

export default function Cart({allitems}){

function mapping(arg){
		// console.log(arg);
		if(arg.length == 0){
			return(
				<>
					<div className={styleses.emptyCart}>
						Корзина пуста
					</div>
				</>
			)
		}	
		else{
			return arg.map(
				({id, photo, name, price, amount}) => (
				<div key={name} name={id} id={id} className={styleses.item}>
					<div className={styleses.photoContainer}>
						<img src={photos[photo]} alt="Товар" className={styleses.photo}/>
					</div>
					<div className={styleses.info}>
						<div className={styleses.price}>{price*amount} руб.</div>
						<div className={styleses.name}>{name}</div>
						<div className={styleses.amount}>Количество: {amount}</div>
					</div>
					<div className={styleses.delete} onClick={(info) => {
						allitems = allitems.filter(el => el.id !== info.target.name)
						const trash = document.getElementById(info.target.name)
						console.log(allitems);
                        trash.remove()
					}}>
						<img name={id} src={cross} alt="Удалить" className={styleses.cross} />
					</div>
				</div>
			)
		)}
	}

	useEffect(() => {
       	mapping(allitems)
    }, [allitems])

	return(
		<div className={styleses.cart}>
			<div className={styleses.head} onClick={() => {console.log(allitems)}}>
				Корзина
			</div>
			<div className={styleses.items}>
				{mapping(allitems)}
			</div>
		</div>
	)
}