import { BrowserRouter as Router } from 'react-router-dom';
import "../styles/about.css";
import img_feature1 from "../assets/ing2rec.png";
import img_feature2 from "../assets/img2rec.png";
import img_feature3 from "../assets/cuisine.jpg";
import img_info from "../assets/info.jpg";
const AboutPage = () => {

  return (
    <div>
        <div>
            <div className="background">
                <div className="center">
                    <h1 className="feature-head">Features</h1>
                    <hr className="fancy-line"/>
                </div>
                <div className="row center col-xs-12 col-sm-6 col-md-4 col-lg-4">
                    <img className="img" src={img_feature1} alt="img"/>
                    <h3>Ingredients to Recipe</h3>
                    <p>Do you have limited ingredients, and don't know what to cook?</p>
                </div>
                <div className="row center col-xs-12 col-sm-6 col-md-4 col-lg-4">
                    <img className="img" src={img_feature2} alt="img"/>
                    <h3>Image to Recipe</h3>
                    <p>Do you have an image of a delicious looking dish and want to try it out, and don't know where to start from?</p>
                </div>
                <div className="row center col-xs-12 col-sm-6 col-md-4 col-lg-4">
                    <img className="img" src={img_feature3} alt="img"/>
                    <h3>Different Cuisines</h3>
                    <p>Do you want to try out delicious recipes of your favorite Cuisine?</p>
                </div>
            </div>
        </div>

        <div>
            <div className="background-1">
                <div className="row center col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <img src={img_info} alt="img"/>
                </div>
                <div className="row left col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <h1 className="info-head">About Us</h1>
                    <hr className="fancy-line-1"/>
                    <p className="text">Most often, we get into a situation when we want to cook something delicious, however, we are short on ingredients at our home. Many times we see an image of a delicious looking dish and want to try it out, but we don't know how to cook it.<br/><br/>We, at RecipeBowl, aim to make a user aware of the various dishes which can be cooked from available set of ingredients being input by a user. There may be times when a person desires for new, delicious, healthy, or maybe presentable cuisines and above all it necessarily be homemade as the possibilities to get one from outside might be restricted like in recent pandemic period (Covid-19).</p>
                </div>
            </div>
        </div>
      
    </div>
  );
};

export default AboutPage;
