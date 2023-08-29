// [ingredientId].server.jsx

import Layout from "../../components/Layout.server";
import { useRouteParams } from "@shopify/hydrogen";

const IngredientPage = () => {
    const { ingredientId } = useRouteParams();
    
    const ingredientInfo = ingredientData.find(
      (item) => item.id === parseInt(ingredientId, 10)
    );
  
    return (
        <Layout>
            <div>
                <h1>{ingredientInfo?.keyword}</h1>
                <p>{ingredientInfo?.description}</p>
            </div>
        </Layout>
    );
}

export default IngredientPage;
