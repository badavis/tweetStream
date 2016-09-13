import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Tweet } from 'react-twitter-widgets';
import _ from 'lodash';

const tweetStore = [];

const TweetList = React.createClass({
  getInitialState: function() {
    return {data: tweetStore};
  },
  componentDidMount: function() {
    let src = new EventSource('http://localhost:3101/api/sweepStakes/change-stream');
    src.addEventListener('data', function(e) {
      tweetStore.unshift(e.data);
      this.setState({data: tweetStore});
    }.bind(this), false);
  },
  render: function() {
    return (
      <div className="tweetList">
        <Letter title="TweetSweeper" />
        <TweetBox data={this.state.data} />
      </div>
    );
  }
});

const TweetBox = React.createClass({
  render: function() {
    console.log('this.props.data', this.props.data);
    const tweetNodes = this.props.data.map(function(tweetObject) {
      const parsedTweet = JSON.parse(tweetObject).data.tweet;
      console.log('parsedTweet', parsedTweet);

      return (
        <TweetComponent author={parsedTweet.user.screen_name} key={parsedTweet.id}>
          <Tweet
            tweetId={parsedTweet.id_str}
            onLoad={() => console.log('tweetComponent is loaded!' + parsedTweet.text)}
          />
        </TweetComponent>
      );
    });
    return (
      <div className="tweetBox">
        {tweetNodes}
      </div>
    );
  }
});

const TweetComponent = React.createClass({
  render: function() {
    return (
      <div className="tweetComponent">
        {this.props.children}
      </div>
    );
  }
});

const Letter = React.createClass({
  render: function() {
    const title = this.props.title;
    const letters = [];

    _.forEach(title, letter => {
      const letterListItem = (
        <li className="letter">
          {letter}
        </li>
      );
      letters.push(letterListItem);
    });

    const letterList = (
      <ul>{letters}</ul>
    );

    return letterList;
  }
});

ReactDOM.render(
  <TweetList />,
  document.getElementById('root')
);
