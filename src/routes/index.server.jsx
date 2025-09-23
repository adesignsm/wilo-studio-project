import { Link, Image, gql, useShopQuery, CacheLong } from "@shopify/hydrogen";
import Layout from "../components/Layout.server";
import VideoPlayer from "../components/VideoPlayer.client";

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
        <div className="collections-container">
          {collections.nodes.map((collection) => {
            return (
              <div key={collection.id} className="collection-item">
                <Link to={`/collections/${collection.handle}`}>
                  {collection?.image && (
                    <div className="collection-content">
                      <Image
                        className="collection-image"
                        alt={`Image of ${collection.title}`}
                        data={collection.image}
                      />
                      <button className="collection-button">
                        {collection.handle}
                      </button>
                    </div>
                  )}
                </Link>
              </div>
            );
          })}
        </div>
        <div className="collections-container-2">
          <VideoPlayer src="https://cdn.shopify.com/videos/c/o/v/f1bb21e5820d4557b6252c411719bc15.mp4" />
          <p>
            A collection of self-care products to create a tranquil environment
            where rest and relaxation can take place.
          </p>
        </div>
        <br />
      </section>
    </Layout>
  );
};

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
