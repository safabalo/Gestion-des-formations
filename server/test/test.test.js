const request = require('supertest')
const app = require('../server')

describe("Authentification", () => {
    describe("POST /api/auth/login", () => {
        let body = {
            email: "",
            password: ""
        }
        test("Fill the all fields to login", async () => {
            const response = await request(app).post("/auth/login").send(body)
            expect(response.statusCode).toBe(200)
        })
        test("Email or password are incorect", async () => {
            body = {
                email: "...",
                password: "..."
            }
            const response = await request(app).post("/auth/login").send(body)
            expect(response.statusCode).toBe(200)
        })
        test("Login Success", async () => {
            body = {
                email: "safaabalha58@gmail.com",
                password: "7mnyi5q3"
            }
            const response = await request(app).post("/auth/login").send(body)
            expect(response.statusCode).toBe(200)
        })
    })

    describe("GET /api/auth/logout", () => {
        test("You are logout", async () => {
            const response = await request(app).get("/auth/logout")
            expect(response.statusCode).toBe(200)
        })
    })
})
describe("Organismes", () => {
    let body = {
        name: '',
        adress: '',
        phone: '',
    }
    describe("GET /organism", () => {
        test("get organismes", async () => {
            const response = await request(app).get("/")
            expect(response.statusCode).toBe(200)
        })
    })
    describe("POST /organism", () => {
        test("All fields are required", async () => {
            const response = await request(app).post("/organism").send(body)
            expect(response.statusCode).toBe(200)
        })
    })
    describe("POST /organism", () => {
        test("Organisme not found", async () => {
            const response = await request(app).put("/organism/00000")
            expect(response.statusCode).toBe(200)
        })
    })
    describe("POST /organism", () => {
        test("Organisme not found", async () => {
            const response = await request(app).delete("/organism/00000")
            expect(response.statusCode).toBe(200)
        })
    })
})
describe("Formations", () => {
    describe("GET /formation", () => {
        test("get formations", async () => {
            const response = await request(app).get("/formation")
            expect(response.statusCode).toBe(200)
        })
    })
    describe("POST /formation", () => {
        let body = {
            name: '',
            organism: '',
            image: ''
        }
        test("Fill the all fields", async () => {
            const response = await request(app).post("/formation").send(body)
            expect(response.statusCode).toBe(200)
        })
        test("Formation not found", async () => {
            const response = await request(app).put("/formation/00000")
            expect(response.statusCode).toBe(200)
        })
        test("Formation not found", async () => {
            const response = await request(app).delete("/formation/00000")
            expect(response.statusCode).toBe(200)
        })
    })
})
describe("Employes", () => {
    let body = {
        username: '',
        email: '',
        organisme: ''
    }
    describe("GET /employes", () => {
        test("Get all the users who have the role employes", async () => {
            const response = await request(app).get("/admin/employes")
            expect(response.statusCode).toBe(200)
        })
    })
    describe("POST /admin/addEmployee", () => {
        test("all fiels id required", async () => {
            const response = await request(app).post("/admin/addEmploye").send(body)
            expect(response.statusCode).toBe(200)
        })
        test('email already exists', async () => {
            email = 'belih87579@webonoid.com';
            const res = await request(app).post('/admin/addEmploye').send({ body });
            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual({ error: 'This email already exist' });
          });
    })
    describe("GET /employe", () => {
        test("Employe not existed", async () => {
            const response = await request(app).get("/admin/employe")
            expect(response.text).toBe("No employer")
        })
    })

})
describe("Historiques", () => {
    describe("GET /historique", () => {
        test("get ", async () => {
            const response = await request(app).get("/admin/historique")
            expect(response.statusCode).toBe(200)
        })
    })
    describe("POST /admin/historique", () => {
        let body = {
            formation: '',
            user: '',
            debut:'',
            fin:'',
        }
        test("All fields are required", async () => {
            const response = await request(app).post("/admin/historique").send(body)
            expect(response.statusCode).toBe(200)
        })
        test("Historique not found", async () => {
            const response = await request(app).put("/admin/historique/00000")
            expect(response.statusCode).toBe(200)
        })
    })
})
describe("Statistique", () => {
    describe("GET /admin/statistiques", () => {
        test("get statistique", async () => {
            const response = await request(app).get("/admin/statistiques")
            expect(response.statusCode).toBe(200)
        })
    })
})




