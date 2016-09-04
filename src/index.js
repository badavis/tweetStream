import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

// const data = [
//   {id: 1, author: "Pete Hunt", text: "This is one comment"},
//   {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
// ];

const CommentBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    let src = new EventSource('http://localhost:3100/api/sweepStakes/change-stream');
    src.addEventListener('data', function(e) {
      console.log(e.data);
      this.setState({data: [e.data]});
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
    // const commentNodes = this.props.data.map(function(comment) {
    //   return (
    //     <Comment author={comment.author} key={comment.id}>
    //       {comment.text}
    //     </Comment>
    //   );
    // });
    // return (
    //   <div className="commentList">
    //     {commentNodes}
    //   </div>
    // );
    let tweet;
    if(this.props.data[0]) {
      tweet = JSON.parse(this.props.data[0]);
      console.log('Tweet', tweet.data.tweet.text);
      tweet = tweet.data.tweet.text;
    }
    return (
      <div className="commentList">
        {tweet}
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
          {this.props.author}
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
