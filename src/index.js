import React from 'react';
import ReactDOM from 'react-dom';

class Test extends React.Component {
    render() {
        return (
        	<div>This is fucked up!</div>
        );
    }
}

ReactDOM.render(<Test/>, document.getElementById("root"));
