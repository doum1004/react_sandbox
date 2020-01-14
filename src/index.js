import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Game from './tic-tec-toe/game';
import Users from './components/users';
import Users2 from './components/users2';
import Contact from './components/contact';
import QuillEditor from './components/quilleditor';
import CodeMirrorEditor from './components/codemirroreditor';
import NotFound from './notfound';
import * as serviceWorker from './serviceWorker';

import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'

const routing = (
<Router>
    <div>
        <ul>
            <li>
            <Link to="/">Home</Link>
            </li>
            <li>
            <Link to="/game">Game</Link>
            </li>
            <li>
            <Link to="/users/1">Users</Link>
            </li>
            <li>
            <Link to="/users2">Users2</Link>
            </li>
            <li>
            <Link to="/contact">Contact</Link>
            </li>
            <li>
            <Link to="/quilleditor">QuillEditor</Link>
            </li>
            <li>
            <Link to="/codemirroreditor">CodeMirrorEditor</Link>
            </li>
        </ul>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/game" component={Game} />
            <Route path="/users/:id" component={Users} />
            <Route path="/users2" component={Users2} />
            <Route path="/contact" component={Contact} />
            <Route path="/quilleditor" component={QuillEditor} />
            <Route path="/codemirroreditor" component={CodeMirrorEditor} />
            <Route component={NotFound} />
        </Switch>
    </div>
</Router>
)

ReactDOM.render(routing, document.getElementById('root'))


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
