import React from 'react'
import { Route, Link } from 'react-router-dom'

const c = ({ match }) => <p>{match.params.id}</p>

class Contact extends React.Component {
    render() {
        const {url} = this.props.match;
        console.log(url)
        return (
        <div>
            <h1>Contact</h1>
            <strong>select a user</strong>
            <ul>
            <li>
                <Link to={url + "/" + 1}>Contact 1 </Link>
            </li>
            <li>
                <Link to={url + "/" + 2}>Contact 2 </Link>
            </li>
            </ul>
            <Route path="/contact/:id" component={c} />
        </div>
        )
    }
}

export default Contact;