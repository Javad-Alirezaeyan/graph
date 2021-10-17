const BuilderCypherNeo4j = require("./BuilderCypherNeo4j")
// @ponicode
describe("withRelation", () => {
    let inst

    beforeEach(() => {
        inst = new BuilderCypherNeo4j()
    })

    test("0", () => {
        let callFunction = () => {
            inst.withRelation()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("getCypherQuery", () => {
    let inst

    beforeEach(() => {
        inst = new BuilderCypherNeo4j()
    })

    test("0", () => {
        let callFunction = () => {
            inst.getCypherQuery()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("makeSession", () => {
    let inst

    beforeEach(() => {
        inst = new BuilderCypherNeo4j()
    })

    test("0", async () => {
        await inst.makeSession()
    })
})

// @ponicode
describe("closeSession", () => {
    let inst

    beforeEach(() => {
        inst = new BuilderCypherNeo4j()
    })

    test("0", () => {
        let callFunction = () => {
            inst.closeSession()
        }
    
        expect(callFunction).not.toThrow()
    })
})
