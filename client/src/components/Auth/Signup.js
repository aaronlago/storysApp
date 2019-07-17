import React, { Component} from 'react'

class Signup extends Component {
    constructor(props) {
        super(props)
        this.satate = {
            username: '',
            email: '',
            password: '',
            password2:''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handlesubmit.bind(this)
    }
    handleChange (e) {
        this.setState({ [ e.target.name ]: e.target.value })
    }
    
    handleSubmit (e) {
        e.prevenDefault()
        console.log('Submited')
    }
    render() {
        const { username, email, password, password2 } = this.state

        return (
            <div className="content">
                <h2>Register</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        name:"usename"
                        onChange={this.handleChange}
                        value={username}
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        onChange={this.handleChange}
                        value={email}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={this.handleChange}
                        value={password}
                    />
                    <input
                        type="password"
                        placeholder="Repeat password"
                        name="password2"
                        onChange={this.handleChange}
                        value={password2}
                    />
                    <button type="submit">
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

export default Signup