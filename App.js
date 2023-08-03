import React, {
	useState,
	useEffect,
} from "react";
import "./style/main.css";
import { GiShoppingBag } from "react-icons/gi";
import RatingStars from "./components/RatingStars";
import ShoppingCart from "./components/ShoppingCart";

const products = [
	{
		id: 1,
		name: "Samsung S23",
		rating: 4.5,
		description:
			"Refurbed products are more sustainable and up to 40% cheaper compared to a new device. Your trusted refurbed product comes with a minimum 12-month warranty.",
		price: 220,
		image: require("./assets/images/product-1.png"),
	},
	{
		id: 2,
		name: "Iphone 14",
		rating: 4.2,
		description:
			"iPhone 14 has the same incredible chip that's in iPhone 13 Pro. A15 Bionic, with a 5‑core GPU, powers all the latest features and makes graphically intense games and AR apps feel ultra-fluid.",
	price: 229,
		image: require("./assets/images/product-2.png"),
	},
	{
		id: 3,
		name: "Smart Watch",
		rating: 3.2,
		description:
			"The Galaxy Watch is a smartwatch that can analyse your exercise pattern, manage your health and allows you to use a variety of convenient apps for making phone calls and playing music.",
		price: 99,
		image: require("./assets/images/product-3.png"),
	},
	{
		id: 4,
		name: "Iwatch",
		rating: 4.8,
		description:
			"You would turn your wrist and know how much time you have left. For such a forgetful person like me, a watch can sometimes be a lifesaver.",
		price: 119,
		image: require("./assets/images/product-4.png"),
	},
	{
		id: 5,
		name: "Google Pixel 6a",
		rating: 4.2,
		description:
			"Google Pixel is a brand of portable consumer electronic devices developed by Google that run either ChromeOS or the Android operating system.",
		price: 100,
		image: require("./assets/images/product-5.jpg"),
	},
	{
		id: 6,
		name: "Boom Headphones",
		rating: 3.9,
		description:
			"The BOOM MIINI are comfortable, lightweight, and ultra-compact on-ear headphones with an impressive sound performance, changeable ear-cushions, and with IPX-5 certification.",
		price: 30,
		image: require("./assets/images/product-6.png"),
	},
];

function App() {
	const [cartsVisibilty, setCartVisible] =
		useState(false);
	const [productsInCart, setProducts] =
		useState(
			JSON.parse(
				localStorage.getItem(
					"shopping-cart"
				)
			) || []
		);
	useEffect(() => {
		localStorage.setItem(
			"shopping-cart",
			JSON.stringify(productsInCart)
		);
	}, [productsInCart]);
	const addProductToCart = (product) => {
		const newProduct = {
			...product,
			count: 1,
		};
		setProducts([
			...productsInCart,
			newProduct,
		]);
	};

	const onQuantityChange = (
		productId,
		count
	) => {
		setProducts((oldState) => {
			const productsIndex =
				oldState.findIndex(
					(item) =>
						item.id === productId
				);
			if (productsIndex !== -1) {
				oldState[productsIndex].count =
					count;
			}
			return [...oldState];
		});
	};

	const onProductRemove = (product) => {
		setProducts((oldState) => {
			const productsIndex =
				oldState.findIndex(
					(item) =>
						item.id === product.id
				);
			if (productsIndex !== -1) {
				oldState.splice(productsIndex, 1);
			}
			return [...oldState];
		});
	};

	return (
		<div className="App">
			<ShoppingCart
				visibilty={cartsVisibilty}
				products={productsInCart}
				onClose={() =>
					setCartVisible(false)
				}
				onQuantityChange={
					onQuantityChange
				}
				onProductRemove={onProductRemove}
			/>
			<div className="navbar">
				<h3 className="logo">Logo</h3>
				<button
					className="btn shopping-cart-btn"
					onClick={() =>
						setCartVisible(true)
					}>
					<GiShoppingBag size={24} />
					{productsInCart.length >
						0 && (
						<span className="product-count">
							{
								productsInCart.length
							}
						</span>
					)}
				</button>
			</div>
			<main>
				<h2 className="title">
					Products
				</h2>
				<div className="products">
					{products.map((product) => (
						<div
							className="product"
							key={product.id}>
							<img
								className="product-image"
								src={
									product.image
								}
								alt={
									product.image
								}
							/>
							<h4 className="product-name">
								{product.name}
							</h4>
							<RatingStars
								rating={
									product.rating
								}
							/>
							<p>
								{
									product.description
								}
							</p>
							<span className="product-price">
								{product.price}$
							</span>
							<div className="buttons">
								<button className="btn">
									Detail
								</button>
								<button
									className="btn"
									onClick={() =>
										addProductToCart(
											product
										)
									}>
									Add to cart
								</button>
							</div>
						</div>
					))}
				</div>
			</main>
		</div>
	);
}

export default App;