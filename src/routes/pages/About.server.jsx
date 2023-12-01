import { Suspense } from 'react';
import { useShopQuery, gql, Link } from '@shopify/hydrogen';
import Layout from "../../components/Layout.server";
import "../../styles/policy.css"; // Assuming you want to use the same styles
import leftArrow from "../../assets/leftArrow.svg";

const AboutPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AboutContent />
    </Suspense>
  );
};

const AboutContent = () => {
  const { data, loading } = useShopQuery({
    query: ABOUT_QUERY,
    preload: true,
  });

  const shop = data?.shop || {};

  return (
    <Layout>
      <section>
        <div className="policy-container">
          <div className='left-div'>
            <h1>{shop.name || 'Shop Info Not Available'}</h1>
            {/* <Link to="/" className='policy-links'>Contact</Link> */}
            <Link to="/"><img src={leftArrow}/></Link>
          </div>
          <div className='right-div'>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <div>
                  <h1>{shop.name}</h1>
                  <div dangerouslySetInnerHTML={{ __html: shop.description }} />
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;

const ABOUT_QUERY = gql`
  query ShopInfo {
    shop {
      name
      description
    }
  }
`;
