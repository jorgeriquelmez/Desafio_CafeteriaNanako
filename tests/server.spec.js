const request = require('supertest')
const server = require('../index')

describe('Operaciones CRUD de cafes', () => {
  afterAll(async () => {
    if (server && typeof server.close === 'function') {
      console.log('Cerrando el servidor de pruebas...')
      await server.close()
      console.log('Servidor de pruebas cerrado.')
    } else {
      console.warn(
        'Advertencia: El objeto "server" no tiene un método .close() o no es una instancia de servidor HTTP.'
      )
    }
  })

  // 1. Testea que la ruta GET /cafes devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto.
  describe('GET /cafes', () => {
    it('debería retornar un status 200 y un arreglo con al menos un cafe', async () => {
      const response = await request(server).get('/cafes')
      expect(response.statusCode).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
      expect(response.body.length).toBeGreaterThanOrEqual(1)
    })
  })

  // 2. Comprueba que se obtiene un código 404 al intentar eliminar un café con un id que no existe.
  describe('DELETE /cafes/:id', () => {
    it('debería retornar 404 si el ID no existe (con token)', async () => {
      const nonExistentId = '9999' // Un ID que sabes que no existe
      const dummyToken = 'Bearer fake-jwt-token' // Simula un token JWT válido
      const response = await request(server)
        .delete(`/cafes/${nonExistentId}`)
        .set('Authorization', dummyToken) // Envía el token en la cabecera

      expect(response.statusCode).toBe(404) // Espera 404 si el token está presente y el ID no existe
      expect(response.body.message).toBe(
        'No se encontró ningún cafe con ese id'
      )
    })
  })

  // 3. Prueba que la ruta POST /cafes agrega un nuevo café y devuelve un código 201.
  describe('POST /cafes', () => {
    let newCafePayload

    beforeEach(() => {
      // Genera un ID único para cada prueba POST para evitar conflictos
      newCafePayload = {
        id: Date.now().toString(),
        nombre: 'Cafe Test ' + Date.now()
      }
    })

    it('debería agregar un nuevo café y retornar un status 201', async () => {
      const response = await request(server).post('/cafes').send(newCafePayload)
      expect(response.statusCode).toBe(201)
      // Asume que la API devuelve la lista actualizada incluyendo el nuevo café
      expect(response.body).toContainEqual(newCafePayload)
    })
  })

  // 4. Prueba que la ruta PUT /cafes devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload.
  describe('PUT /cafes/:id', () => {
    let existingCafeId
    let updatedCafePayload

    beforeEach(async () => {
      existingCafeId = '1'
      updatedCafePayload = {
        id: existingCafeId,
        nombre: 'Cafe Actualizado ' + Date.now()
      }
    })

    it('debería retornar 400 si el id en los parámetros es diferente al id en el payload', async () => {
      const paramId = '999'
      const response = await request(server)
        .put(`/cafes/${paramId}`)
        .send(updatedCafePayload)
      expect(response.statusCode).toBe(400)
      expect(response.body.message).toBe(
        'El id del parámetro no coincide con el id del café recibido'
      )
    })
  })
})
