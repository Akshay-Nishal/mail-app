import { render as renderLib, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import store from "../../Store/store"
import userEvent from "@testing-library/user-event"
import { act } from "react-dom/test-utils"
import Compose from "./Compose"


const render = component =>renderLib(
    <Provider store = {store}>
        {component}
    </Provider>
)
describe('Compose Component',()=>{
    test('renders compose form',()=>{
        render(<Compose/>)
        const loginText = screen.getByText('Compose Mail',{exact : true})
        expect(loginText).toBeInTheDocument()
    })
    test('renders send button',()=>{
        render(<Compose/>)
        const loginText = screen.getByText('Send',{exact : true})
        expect(loginText).toBeInTheDocument()
    })
    test('renderd warning for imcomplete data',()=>{
        //Arrange
        render(<Compose/>)

        //Act
        const sendButton = screen.getByTestId('email-send-button')
        act(()=>{
            userEvent.click(sendButton) 
        })

        //Assert
        const loginText = screen.getByText('Please fill up all data',{exact : false})
        expect(loginText).toBeInTheDocument()

    })
    test('entering data in fields of compose mail',()=>{
        //Arrange
        render(<Compose/>)

        //Act
        const emailInputField = screen.getByTestId('emailInput')
        const subjectInputField = screen.getByTestId('subInput')
        userEvent.type(emailInputField,'mail2@gmail.com')
        userEvent.type(subjectInputField,'Test Subject')

        //Assert
        expect(screen.getByTestId('emailInput')).toHaveValue('mail2@gmail.com')
        expect(screen.getByTestId('subInput')).toHaveValue('Test Subject')

    })
    test('sending mail successfully',()=>{
        //Arrange
        render(<Compose/>)

        //Act
        const emailInputField = screen.getByTestId('emailInput')
        const subjectInputField = screen.getByTestId('subInput')
        userEvent.type(emailInputField,'mail2@gmail.com')
        userEvent.type(subjectInputField,'Test Subject')
        const sendButton = screen.getByTestId('email-send-button')
        act(()=>{
            userEvent.click(sendButton) 
        })

        //Assert
        expect(screen.getByTestId('emailInput')).toHaveValue('mail2@gmail.com')
        expect(screen.getByTestId('subInput')).toHaveValue('Test Subject')
        const loginText = screen.getByText('Mail Sent Successfully',{exact : false})
        expect(loginText).toBeInTheDocument()

    })
})
