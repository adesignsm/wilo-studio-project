import Layout from "../../components/Layout.server";
import CartPage from "../../components/CartPage.client";


const Cart = () => {
    return (
        <>
        <Layout>
            <div className="container">
            <CartPage/>
            </div>
        </Layout>
        </>
    )
}

export default Cart;