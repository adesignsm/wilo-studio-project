import { Suspense } from 'react';
import { useShopQuery, gql, useRouteParams, Link } from '@shopify/hydrogen';
import Layout from "../../components/Layout.server";
import "../../styles/policy.css";
import leftArrow from "../../assets/leftArrow.svg";

const PolicyPage = ({params}) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PolicyContent params={params} />
    </Suspense>
  );
};

const PolicyContent = ({params}) => {
  const { handle } = useRouteParams(params);

  const { data, loading } = useShopQuery({
    query: POLICY_QUERY,
    variables: {
      handle: handle,
    },
    preload: true,
  });

  const shop = data?.shop || {};
  const policies = ['privacyPolicy', 'shippingPolicy', 'termsOfService', 'refundPolicy'].map(field => shop[field]).filter(Boolean);
  const policy = policies.find(p => p.handle === handle);

  return (
    <Layout>
      <section >
        <div className="policy-container">
        <div className='left-div'>
          <h1>{policy.title || 'Policy not found'}</h1>
        <Link to="/"><img src={leftArrow}/></Link> 
        </div>
        <div className='right-div'>
        {loading ? (
          <p>Loading...</p>
          ) : (
            <>
            {policy ? (
              <div>
                <h1>{policy.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: policy.body }} />
              </div>
            ) : (
              <p>Policy not found</p>
              )}
          </>
        )}
        </div>
        </div>
      </section>
    </Layout>
  );
};

export default PolicyPage;




const POLICY_QUERY = gql`
fragment PolicyItem on ShopPolicy {
  id
  title
  handle
  body
  url
}

query Policies ($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language){
shop {
 privacyPolicy {
  ...PolicyItem
}
   shippingPolicy {
      ...PolicyItem
    }
    termsOfService {
      ...PolicyItem
    }
    refundPolicy {
      ...PolicyItem
    }
    subscriptionPolicy {
      id
      title
      handle
    }
  }
}
`;
