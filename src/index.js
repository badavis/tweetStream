import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Tweet } from 'react-twitter-widgets';

const tweetStore = [];

const CommentBox = React.createClass({
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
      <div className="commentBox">
        <h1>Cheetosio</h1>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    );
  }
});

const CommentList = React.createClass({
  render: function() {
    console.log('this.props.data', this.props.data);
    const commentNodes = this.props.data.map(function(tweetObject) {
      const parsedTweet = JSON.parse(tweetObject).data.tweet;
      console.log('parsedTweet', parsedTweet);

      return (
        <Comment author={parsedTweet.user.screen_name} key={parsedTweet.id}>
          <Tweet
            tweetId={parsedTweet.id_str}
            onLoad={() => console.log('Tweet is loaded!' + parsedTweet.text)}
          />
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

const CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">

      </div>
    );
  }
});

const Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        {this.props.children}
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox />,
  document.getElementById('root')
);
