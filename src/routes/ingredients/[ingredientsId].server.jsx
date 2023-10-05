// [ingredientId].server.jsx
import Layout from "../../components/Layout.server";
import Ingredient from "../../components/Ingredient.client";

const IngredientPage = () => {  
    return (
        <Layout>
            <Ingredient />
        </Layout>
    );
}

export default IngredientPage;
