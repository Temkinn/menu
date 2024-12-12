import blackPhotos from "./menuPhotos/photos"

const menu = {
	black: [
	  {
		id: 'americano',
		name: "Американо",
		price: 5.5,
		g: 200,
		photo: blackPhotos.americano,
	  },
	  {
		id: 'cherry',
		name: "Фильтр Вишневый",
		price: 7.5,
		g: 250,
		photo: blackPhotos.cherry,
	  },
	  {
		id: 'classic',
		name: "Фильтр Classic",
		price: 5.5,
		g: 250,
		photo: blackPhotos.classic,
	  },
	  {
		id: 'espresso',
		name: "Эспрессо",
		price: 4.5,
		g: 50,
		photo: blackPhotos.classic,
	  },
	  {
		id: 'v60',
		name: "V60; Aeropress",
		price: 6,
		g: 230,
		photo: blackPhotos.classic,
	  },
	]
}

export default menu