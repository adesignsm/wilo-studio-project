import Layout from "../components/Layout.server";
import HOMELANDING_HOME from "../assets/HOMELANDING_HOME.jpg"
import HOMELANDING_SKIN from "../assets/HOMELANDING_SKIN.png"
import LANDING_VID from "../assets/WEB-LANDING_VID.mp4"

export default function Home() {
  return (
    <Layout>
      <div className="home-page container">
        <div className="homepage-image-container">
            <img src={HOMELANDING_HOME} alt="Home Landing" />
            <img src={HOMELANDING_SKIN} alt="Skin Landing" />
        <video autoPlay loop muted>
            <source src={LANDING_VID} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        </div>
        <p>A collection of self-care products to create a tranquil environment 
          where rest and relaxation can take place.
        </p>
        <br/> 
      </div>
    </Layout>
  );
}
