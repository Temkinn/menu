import styles from "./App.module.css";
import { useState, useEffect } from "react";

import Header from "./components/header/header.jsx";
import Background from "./components/background/background.jsx";
import styleses from "./components/cart/styles.module.css";

import menu from "./menu.js";
import openCart from "./assets/cart.png";
import cross from "./assets/cross.png";
import back from "./assets/back.png";

function App() {
  const [cart, setCart] = useState(false);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState("");
  const tg = window.Telegram.WebApp;

  useEffect(() => {
    mapping(items);
    for (let i = 0; i < items.length; i++) {
      if (items[i].amount == 0) {
        setItems(items.filter((item) => item.amount != 0));
      }
    }
    setTotal(
      items.reduce((sum, item) => sum + item.price * item.amount, 0).toFixed(2)
    );
    setData(
      `${items
        .map((item) => {
          return `${item.name} (${item.price} руб.) - ${item.amount} шт. = ${
            item.price * item.amount
          } руб.`;
        })
        .join("\n")}\nВсего ${items.reduce((sum, item) => sum + item.price * item.amount, 0).toFixed(2)} руб.\nПриготовить {}`
    );
  }, [items]);

  function mapping(arg) {
    if (arg.length == 0) {
      return (
        <>
          <div className={styleses.emptyCart}>Корзина пуста</div>
        </>
      );
    } else {
      return arg.map(({ id, photo, name, price, amount }) => (
        <div key={name} name={id} id={id} className={styleses.item}>
          <div className={styleses.photoContainer}>
            <img src={photo} alt="Товар" className={styleses.photo} />
          </div>
          <div className={styleses.info}>
            <div className={styleses.name}>{name}</div>
            <div className={styleses.price}>{price * amount} руб.</div>
            <div className={styleses.amount}>Количество: {amount}</div>
          </div>
          <div
            className={styleses.delete}
            onClick={(info) => {
              setItems(items.filter((el) => el.id !== info.target.name));
            }}
          >
            <img
              name={id}
              src={cross}
              alt="Удалить"
              className={styleses.cross}
            />
          </div>
        </div>
      ));
    }
  }

  function add({id, name, price, photo }) {
    if (items.some((item) => item.id === id)) {
      const updatedItems = items.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      );
      setItems(updatedItems);
    } else {
      const newItems = [
        ...items,
        { id: id, name: name, price: price, photo: photo, amount: 1 }
      ];
      setItems(newItems);
    }
  }

  function remove({ id }) {
    if (items.some((item) => item.id === id)) {
      const item = items.filter((item) => item.id === id)[0];
      if (item.amount >= 1) {
        const updatedItems = items.map((item) =>
          item.id === id ? { ...item, amount: item.amount - 1 } : item
        );
        setItems(updatedItems);
      }
    }
  }

  function buy() {
    if (items.length != 0) {
      setTotal(
        items.reduce((sum, item) => sum + item.price * item.amount, 0).toFixed(2)
      );
      console.log(data);
      // tg.sendData(data)
      setItems([]);
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className={styles.main}>
      {cart ? (
        <div className={styles.cartContainer}>
          <Background />
          <div className={styleses.cart}>
            <div className={styleses.head}>
              <div
                className={styles.closeCart}
                onClick={() => {
                  setCart(!cart);
                }}
              >
                <img src={back} alt="Закрыть корзину" />
              </div>
              Корзина
            </div>
            <div className={styleses.items}>{mapping(items)}</div>
          </div>
          <div className={styles.timeContainer}>
            <div className={styles.time}>
              <input type="radio" id="now" name="drone" value="huey" />
              <label unselectable="true" htmlFor="now">Сейчас</label>
            </div>

            <div className={styles.time}>
              <input type="radio" id="15min" name="drone" value="dewey" />
              <label unselectable="true" htmlFor="15min">15 минут</label>
            </div>

            <div className={styles.time}>
              <input type="radio" id="30min" name="drone" value="louie" />
              <label unselectable="true" htmlFor="30min">30 минут</label>
            </div>
          </div>
          <div className={styles.sum}>
            Товары({items.reduce((all, item) => all + item.amount, 0)}):
            <div>{total} руб.</div>
          </div>
          <button className={styles.buy} id="order" onClick={() => buy()}>
            Оформить заказ
          </button>
        </div>
      ) : (
        <>
          <Background />
          <Header />
          <div className={styles.menu}>
            <p className={styles.black} id="black">
              Black
            </p>
            {menu.black.map(
              ({ id, name, g, price, photo, description, kpfc }) => {
                return (
                  <div key={id} className={styles.item}>
                    <div className={styles.photo}>
                      <div className={styles.photoInner}></div>
                      <div className={styles.front}>
                        <img src={photo} alt={name} />
                        <div className={styles.amount}>
                          {items.some((item) => item.id === id)
                            ? items.filter((item) => item.id === id)[0].amount
                            : 0}
                        </div>
                      </div>
                      <div className={styles.desc}>
                        <div className={styles.description}>{description}</div>
                        <div className={styles.kpfc}>КБЖУ: {kpfc}</div>
                      </div>
                    </div>
                    <div className={styles.info}>
                      <div className={styles.name}>{name}</div>
                      <div className={styles.g}>{g} мл.</div>
                      <div className={styles.price}>{price} руб.</div>
                    </div>
                    <div className={styles.addToCart}>
                      <div
                        className={styles.remove}
                        onClick={(click) => remove({ click, id })}
                        style={
                          items.some((item) => item.id === id)
                            ? {
                                opacity: 1
                              }
                            : {
                                opacity: 0
                              }
                        }
                      ></div>
                      <div
                        className={styles.add}
                        name={id}
                        onClick={(click) =>
                          add({ click, id, name, price, photo })
                        }
                      ></div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
          <div
            className={styles.openCart}
            style={
              items.length !== 0 ? { opacity: 1 } : { opacity: 0, width: 0 }
            }
            onClick={() => setCart(!cart)}
          >
            <img src={openCart} alt="Корзина" className={styles.openCartIcon} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
