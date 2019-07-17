import React, { Component} from 'react'
import { SIGNUP_USER } from '../../queries'
import { Mutation } from 'react-apollo'

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
        this.validateForm = this.validateForm.bind(this)
    }
    handleChange (e) {
        this.setState({ [ e.target.name ]: e.target.value })
    }
    
    validateForm () {
        // check required inputs
        const{ username, email, password, password2 } = this.state
        return !username || !email || !password || !password2 || (password2 !== password)
    }

    render () {
        const { username, email, password, password2 } = this.state

        return (
            <div className="content">
                <h2>Register</h2>
                <Mutation 
                    mutation={SIGNUP_USER}
                >   
                {(signupUser, { data, loading, error }) => (
                    <form
                        className="form"
                        oonSubmit={async (e) =>{
                            try {
                                e.preventDefault()
                                // get token from graphql server
                                const {data} = await signupUser({ variables: { username, password, email }})
                                // save token to localStorage
                                localStorage.setItem('token', data.signupUser.token)
                                // clear current state
                                this.setState({email: '', password: '', password2: '', username: '' })
                            } catch(err) {
                                console.log(err)
                            }
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Username"
                            name="usename"
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
                        <button 
                            type="submit"
                            disabled={loading || this.validateForm()}
                        >
                            Submit
                        </button>
                    </form>
                )}
                </Mutation>
            </div>
        )
    }
}

export default Signup