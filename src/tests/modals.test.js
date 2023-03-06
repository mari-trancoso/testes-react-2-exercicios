import Modal from "../components/Modal"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

//mocks
const activeModalMock = {
    sprites: {
        front_default: "http://url.com"
    },
    id: "1",
    name: "pokemon",
    types: [
        {
            type: {
                name: "type1"
            }
        }
    ],
    weight: 90,
    height: 30
}

const closeModalMock = jest.fn()

describe("modals", () => {

    test("test renderização do modal", () => {
        render(<Modal activeModal={activeModalMock} closeModal={closeModalMock} />)

        screen.logTestingPlaygroundURL()

        const image = screen.getByRole('img', {
            name: /pokemon/i
        })
        const id = screen.getByRole('heading', {
            name: /#1 pokemon/i
        })
        const name = screen.getByText(/pokemon/i)
        const type = screen.getByText(/type1/i)
        const weight = screen.getByText(/9\.0 kg/i)
        const height = screen.getByText(/3\.0 m/i)
        const closeButton = screen.getByRole('button', {
            name: /❌/i
          })

        expect(image).toBeInTheDocument()
        expect(id).toBeInTheDocument()
        expect(name).toBeInTheDocument()
        expect(weight).toBeInTheDocument()
        expect(height).toBeInTheDocument()
        expect(type).toBeInTheDocument()
        expect(closeButton).toBeInTheDocument()
    })

    test("testar de fechar o modal quando clica no botão", async() => {
        const user = userEvent.setup()

        render(<Modal activeModal={activeModalMock} closeModal={closeModalMock} />)

        const closeButton = screen.getByRole('button', {
            name: /❌/i
          })
        
        await user.click(closeButton)

        expect(closeModalMock).toBeCalledTimes(1)
        expect(closeModalMock).toReturn()
    })

})