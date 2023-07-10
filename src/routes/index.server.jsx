import { Link, Image, gql, useShopQuery, CacheLong } from "@shopify/hydrogen";
import Layout from "../components/Layout.server";

import LANDING_VID from "../assets/WEB-LANDING_VID.mp4";

const Home = () => {
  const {
      data: { collections },
  } = useShopQuery({
      query: QUERY,
      cache: CacheLong(),
      preload: true,
  });

  return (
    <Layout>
      <section className="home-page container">
        <div className="homepage-image-container">
          {collections.nodes.map((collection) => {
            return (
              <Link key={collection.id} to={`/collections/${collection.handle}`}>
                {collection?.image && (
                  <Image className="" alt={`Image of ${collection.title}`} data={collection.image} />
                )}
              </Link>
            );
          })}

          <video autoPlay loop muted>
            <source src={LANDING_VID} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <p>A collection of self-care products to create a tranquil environment 
          where rest and relaxation can take place.
        </p>
        <br/> 
      </section>
    </Layout>
  );
}

export default Home;

const QUERY = gql`
  query {
    collections(first: 2, sortKey: UPDATED_AT) {
      nodes {
        id
        title
        handle
        image {
          altText
          url
        }
      }
    }
  }
`;
