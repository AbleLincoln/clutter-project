const MovieDetails = require("./MovieDetails")
// @ponicode
describe("componentDidMount", () => {
    let inst

    beforeEach(() => {
        inst = new MovieDetails.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.componentDidMount()
        }
    
        expect(callFunction).not.toThrow()
    })
})
