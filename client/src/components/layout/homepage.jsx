import React from 'react';

const HomePage = ({ history }) => {
  return (
    <div>
      <div className="ui inverted vertical masthead center aligned segment">
        <div className="ui text container">
          <h1 className="ui inverted stackable header">
            <div className="content">Food Catalog</div>
          </h1>
          <h4>Come to find your favorite food...</h4>
          <div onClick={() => history.push('/home')} className="ui huge white inverted button">
            Get Started
                   <i className="right arrow icon" />
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        Web application made by{' '}
        <a href="http://www.linkedin.com/in/rashid-majeed" title="Rashid Majeed">
          Rashid Majeed
               </a>
      </div>
    </div>
  );
}

export default HomePage;