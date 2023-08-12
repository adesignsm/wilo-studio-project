import { gql, useShopQuery, CacheLong, Link } from "@shopify/hydrogen";
import rightArrow from "../assets/rightArrow.svg";


const Footer = () => {

    const {data} = useShopQuery({
        query: POLICIES_QUERY,
        cache: CacheLong(),
        preload: true,
    });

    // check if the data exists
    const shop = data?.shop || {} ;

    
    return (

        <footer className="footer">

            <ul className="legal">
                <li> Legal </li>
                <li><Link to={`/policy/${shop.termsOfService.handle}`}>{shop.termsOfService.title}</Link></li>
                <li><Link to={`/policy/${shop.privacyPolicy.handle}`}>{shop.privacyPolicy.title}</Link></li>
            </ul>

            <ul className="inquiry">
                <li> Assistance </li>
                <li> Ordering </li>
                <li><Link to={`/policy/${shop.shippingPolicy.handle}`}>{data.shop.shippingPolicy.title}</Link></li>
                <li><Link to={`/policy/${shop.refundPolicy.handle}`}>{data.shop.refundPolicy.title}</Link></li>
            </ul>

            <ul className="comapny">
                <li> Comapny </li>
                <li><Link to='/pages/About'>About</Link></li>
                <li><Link to='/pages/Contact'>Contact Us</Link></li>
            </ul>

            <ul className="socials">
                <li><a href="https://www.instagram.com">Instagram</a></li>
                <li><a href="https://www.facebook.com">Facebook</a></li>
                <li><a href="https://www.tiktok.com">TikTok</a></li>
            </ul>

            <ul className="subscription">
                <li> Newsletter </li>
                <form>
                    <input placeholder="EMAIL" />
                    <button>
                        <img src={rightArrow} />
                    </button>
                </form>
                <p>I'd like to sign up to the WILO STUDIO newsletter. <br />
                    My email won't be shared with third parties.
                </p>
            </ul>
            
        </footer>
    );
};


export default Footer;



const POLICIES_QUERY = gql`
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

