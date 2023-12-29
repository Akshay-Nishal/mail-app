import { render as renderLib, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import LoginForm from "./LoginForm"
import store from "../../Store/store"
import userEvent from "@testing-library/user-event"
import { act } from "react-dom/test-utils"


const render = component =>renderLib(
    <Provider store = {store}>
        {component}
    </Provider>
)
describe('Login Component',()=>{
    test('renders login form',()=>{
        render(<LoginForm/>)
        const loginText = screen.getByText('Login Form',{exact : true})
        expect(loginText).toBeInTheDocument()
    })

    test('renders signup form',()=>{
        //Arange
        render(<LoginForm/>)

        //Act
        const button = screen.getByTestId('login-signup-state-change')
        act(()=>{
            userEvent.click(button)
        })

        //Assert
        const loginText = screen.getByText('Sign Up Form',{exact : true})
        expect(loginText).toBeInTheDocument()
    })

    test('renders confirm password in signup form',()=>{
        //Arange
        render(<LoginForm/>)

        //Act
        const button = screen.getByTestId('login-signup-state-change')
        act(()=>{
            userEvent.click(button)
        })

        //Assert
        const loginText = screen.getByText('Confirm Password',{exact : true})
        expect(loginText).toBeInTheDocument()
    })

    test('renders forgot password button in signup form',()=>{
        //Arange
        render(<LoginForm/>)

        //Act
        const button = screen.getByTestId('login-signup-state-change')
        act(()=>{
            userEvent.click(button)
        })

        //Assert
        const loginText = screen.getByText('Forgot Password',{exact : true})
        expect(loginText).toBeInTheDocument()
    })
    test('renders enter email in forgot password form',()=>{
        //Arange
        render(<LoginForm/>)

        //Act
        const button = screen.getByTestId('login-signup-state-change')
        act(()=>{
            userEvent.click(button)
        })

        const forgotPasswordButton = screen.getByTestId("forgotpassword-button")
        act(()=>{
            userEvent.click(forgotPasswordButton)
        })
        //Assert
        const loginText = screen.getByText('Enter Email',{exact : true})
        expect(loginText).toBeInTheDocument()
    })
})
