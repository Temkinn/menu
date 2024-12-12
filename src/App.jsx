import styles from "./App.module.css";
import { useState, useEffect } from "react";

import Header from "./components/header/header.jsx";
import Background from "./components/background/background.jsx";
import styleses from './components/cart/styles.module.css'

import menu from "./menu.js";
import openCart from "./assets/cart.png";
import cross from './assets/cross.png'
import back from './assets/back.png'


function App() {
  const [cart, setCart] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() =>{
    for(let i = 0; i < items.length; i++){
      if(items[i].amount == 0){
        setItems(items.filter(item => item.amount != 0))
      }
    }
    mapping(items)
  }, [items])

  function mapping(arg){
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
						<img src={photo} alt="Товар" className={styleses.photo}/>
					</div>
					<div className={styleses.info}>
						<div className={styleses.price}>{price*amount} руб.</div>
						<div className={styleses.name}>{name}</div>
						<div className={styleses.amount}>Количество: {amount}</div>
					</div>
					<div className={styleses.delete} onClick={(info) => {
						setItems(items.filter(el => el.id !== info.target.name))
						console.log(items);
					}}>
						<img name={id} src={cross} alt="Удалить" className={styleses.cross} />
					</div>
				</div>
			)
		)}
	}


  function add({click, id, name, price, photo}){
    click.target.style.width = "46%"
    if (items.some(item => item.id === id)  ) {
      const updatedItems = items.map(item =>
        item.id === id? {...item, amount: item.amount + 1 } : item
      );
      setItems(updatedItems);
    } else {
      const newItems = [...items, { id: id, name: name, price: price, photo: photo, amount: 1 }];
      setItems(newItems)
    }
  }

  function remove({click, id}){
    if (items.some(item => item.id === id)  ) {
      const item = items.filter(item => item.id === id)[0]

      console.log(item);
      if(item.amount >= 1){
        const updatedItems = items.map(item =>
          item.id === id? {...item, amount: item.amount - 1 } : item
        );
        setItems(updatedItems);
      } else {
        console.log('none');
      }



    } else {
      console.log("there is no such items");
    }

  }





//////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className={styles.main}>
      {cart ? (
        <>
            <Background />
            <div className={styleses.cart}>
              <div className={styleses.head} onClick={() => {console.log(items)}}>
                Корзина
              </div>
              <div className={styleses.items}>
                {mapping(items)}
              </div>
            </div>
          <div className={styles.closeCart} onClick={() => setCart(!cart)}>
            <img src={back} alt="Закрыть корзину" />
          </div>
        </>
      ) : (
        <>
          <Background />
          <Header />
          <div className={styles.menu}>
            <p className={styles.black} onClick={
              () => {
                console.log(items);
              }
            } id="black">
              Black
            </p>
            {menu.black.map(({ id, name, g, price, photo }) => {
              return (
                <div key={id} className={styles.item}>
                  <div className={styles.photo}>
                    <img src={photo} alt={name} />
                  </div>
                  <div className={styles.info}>
                    <div className={styles.name}>{name}</div>
                    <div className={styles.g}>{g} мл.</div>
                    <div className={styles.price}>{price} руб.</div>
                  </div>
                  <div className={styles.addToCart}>
                    <div className={styles.remove} onClick={(click) => remove({click, id})}></div>
                    <div className={styles.add} onClick={(click) => add({click, id, name, price, photo})}></div>
                  </div>
                  <div className={styles.amount}>
                      {items.some(item => item.id === id)? items.filter(item => item.id === id)[0].amount : 0}
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.openCart} onClick={() => setCart(!cart)}>
            <img src={openCart} alt="Корзина" className={styles.openCartIcon} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
