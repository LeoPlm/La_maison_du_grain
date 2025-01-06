import {Link} from 'react-router-dom'

export function Nothing() {
    return (
        <div>
            <h1>Nothing here</h1>
            <Link to='/'>Click here 😥</Link>
        </div>
    )
}