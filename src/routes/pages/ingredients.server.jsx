
import Layout from "../../components/Layout.server";
import "../../styles/ingredients.css";
import IngredientsSphere from "../../components/IngredientsSphere.client";


const Ingredients = () => {
    return (
        <>
            <Layout>
                <IngredientsSphere />
            </Layout>
        </>
    )
}

export default Ingredients;