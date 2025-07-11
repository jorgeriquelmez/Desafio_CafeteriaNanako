# Desafio_CafeteriaNanako

## Descripción

Este documento describe las pruebas unitarias realizadas con Jest en el proyecto Desafio_CafeteriaNanako.

## Cobertura de pruebas

Las pruebas cubren las siguientes funcionalidades:

- **Cafetería**
  - Creación de cafeterías
  - Obtención de cafeterías
  - Actualización de cafeterías
  - Eliminación de cafeterías
- **Productos**
  - Creación de productos
  - Obtención de productos
  - Actualización de productos
  - Eliminación de productos

## Pruebas unitarias

### Cafetería

#### Creación de cafeterías

- **Test**: `cafeteria.test.js` > `crearCafeteria`
- **Descripción**: Verifica que se pueda crear una cafetería correctamente
- **Resultado esperado**: La cafetería se crea con éxito y devuelve el objeto creado

```javascript
test("crearCafeteria", async () => {
  const cafeteria = await Cafeteria.create({
    nombre: "Cafetería de prueba",
    direccion: "Dirección de prueba",
  });
  expect(cafeteria).toHaveProperty("id");
  expect(cafeteria.nombre).toBe("Cafetería de prueba");
  expect(cafeteria.direccion).toBe("Dirección de prueba");
});
```

### Obtención de cafeterías

- **Test**: `cafeteria.test.js` > `obtenerCafeterias`
- **Descripción**: Verifica que se puedan obtener todas las cafeterías correctamente
- **Resultado esperado**: Devuelve un arreglo con todas las cafeterías creadas

```javascript
test("obtenerCafeterias", async () => {
  const cafeterias = await Cafeteria.findAll();
  expect(cafeterias).toBeInstanceOf(Array);
  expect(cafeterias.length).toBeGreaterThan(0);
});
```

### Actualización de cafeterías

- **Test**: `cafeteria.test.js` > `actualizarCafeteria`
- **Descripción**: Verifica que se pueda actualizar una cafetería correctamente
- **Resultado esperado**: La cafetería se actualiza con éxito y devuelve el objeto actualizado

```javascript
test("actualizarCafeteria", async () => {
  const cafeteria = await Cafeteria.create({
    nombre: "Cafetería de prueba",
    direccion: "Dirección de prueba",
  });
  const updatedCafeteria = await Cafeteria.update(
    {
      nombre: "Cafetería actualizada",
    },
    {
      where: { id: cafeteria.id },
    }
  );
  expect(updatedCafeteria).toBe(1);
  const cafeteriaActualizada = await Cafeteria.findByPk(cafeteria.id);
  expect(cafeteriaActualizada.nombre).toBe("Cafetería actualizada");
});
```

### Eliminación de cafeterías

- **Test**: `cafeteria.test.js` > `eliminarCafeteria`
- **Descripción**: Verifica que se pueda eliminar una cafetería correctamente
- **Resultado esperado**: La cafetería se elimina con éxito

```javascript
test("eliminarCafeteria", async () => {
  const cafeteria = await Cafeteria.create({
    nombre: "Cafetería de prueba",
    direccion: "Dirección de prueba",
  });
  await Cafeteria.destroy({
    where: { id: cafeteria.id },
  });
  const cafeteriaEliminada = await Cafeteria.findByPk(cafeteria.id);
  expect(cafeteriaEliminada).toBeNull();
});
```
