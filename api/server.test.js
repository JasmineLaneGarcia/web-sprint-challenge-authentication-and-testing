const db = require('../data/dbConfig')
const request = require('supertest')
const server = require('./server')

const testData = { username: 'test', password: 'test' }


// Write your tests here
  test('sanity', () => {
    expect(true).toBe(true)
  })

  beforeEach(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
  })
  //cleans up the database when the test is completed
  afterAll(async () => {
    await db.destroy()
  })

// Register with valid payload
  describe("[POST] /api/auth/register", () => {
      it('Returns status: 201 upon successful registration', async () => {
          const res = await request(server)
          .post('/api/auth/register')
          .send({
            username: "Lambda",
            password: "Rocks"
        });
          expect(res.status).toBe(201)
      });

// Register with invalid payload
      it('Returns status: 500 upon failed registration', async () => {
          const res = await request(server)
          .post('/api/auth/register')
          .send({
            username: "Lambda", 
            password: "SF"
          });
          expect(res.status).toBe(500);
      });
  });

// Login existing user
  describe("[POST] /api/auth/login", () => {

    // with valid payload
      it('Returns status: 201 upon successful login', async () => {
          const res = await request(server)
          .post('/api/auth/login')
          .send(testData);
          expect(res.status).toBe(201)
      })

    // with invalid payload
      it('Returns status: 500 upon failed login', async () => {
          const res = await request(server)
          .post('/api/auth/login')
          .send({
            username: 'Candice',
            password: 'n/a'
          })
          expect(res.status).toBe(500)
      })
  });