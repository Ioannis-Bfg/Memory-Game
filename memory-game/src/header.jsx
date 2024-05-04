import PropTypes from "prop-types";
import "./styles/header.css";

function Header({ score }, { topScore }) {
  return (
    <div className="header">
      <div className="header_title">
        <h1>Memory Game</h1>
        <h2>
          Click on an image to earn points, but do not click on any more than
          once!
        </h2>
      </div>
      <div className="score_board">
        <h3>Score: {score}</h3>
        <h3>Top Score: {topScore}</h3>
      </div>
    </div>
  );
}

Header.propTypes = {
  score: PropTypes.number,
  topScore: PropTypes.number,
};

export default Header;
