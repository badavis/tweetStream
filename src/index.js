import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';



// const data = [
//   {id: 1, author: "Pete Hunt", text: "This is one comment"},
//   {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
// ];

const tweetStore = [];

const CommentBox = React.createClass({
  getInitialState: function() {
    return {data: tweetStore};
  },
  componentDidMount: function() {
    let src = new EventSource('http://localhost:3000/api/sweepStakes/change-stream');
    src.addEventListener('data', function(e) {
      // console.log(e.data);
      tweetStore.push(e.data);
      // widget to display tweet in twitter formatting
      twttr.widgets.createTweet(
        JSON.parse(e.data).data.tweet.id_str,
        document.getElementById('root'),
        {
          align: 'center'
        })
        .then(function(el){
          console.log("tweet has been displayed")
        });

      this.setState({data: tweetStore});
    }.bind(this), false);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>FisherPrice MyFirst TweetBox</h1>
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
      // return (
      //   <Comment author={parsedTweet.user.screen_name} key={parsedTweet.id}>
      //   {parsedTweet.text}
      //   </Comment>
      // );
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
        <h2 className="commentAuthor">
          @{this.props.author} Tweeted:
        </h2>
        {this.props.children}
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox />,
  document.getElementById('root')
);
