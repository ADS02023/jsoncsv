// Obtiene referencias a elementos HTML usando sus IDs.
const jsonForm = document.querySelector("#jsonform");
const csvForm = document.querySelector("#csvform");
const bConvert = document.querySelector("#bConvert");

// Agrega un evento de clic al botón de conversión.
bConvert.addEventListener("click", (e) => {
  let json; // Variable para almacenar los datos JSON.
  let keys = []; // Variable para almacenar las claves (cabeceras) de CSV.
  let values = []; // Variable para almacenar los valores de CSV.
  
  try {
    // Intenta analizar el contenido del área de texto JSON en un objeto JSON.
    json = JSON.parse(jsonForm.value);
  } catch (error) {
    console.log("Formato incorrecto", error);
  }

  if (Array.isArray(json)) {
     // Si el JSON es un arreglo.
     json.forEach((item) => {
      const nkeys = Object.keys(item); // Obtiene las claves del objeto.
      if (keys.length === 0) {
        // Si es la primera fila, asigna las claves a 'keys'.
        keys = [...nkeys];
      } else {
        if (nkeys.length != keys.length) {
          // Si el número de claves es diferente en una fila, lanza un error.
          throw new Error("Número de claves es diferente");
        } else {
          console.log("Correcto", nkeys);
        }
      }
      const row = keys.map((k) => {
        // Mapea los valores de acuerdo a las claves en 'keys'.
        return item[k];
      });
      values.push([...row]); // Agrega la fila a 'values'.
    });//fin del forEach
    values.unshift(keys); // Agrega las claves como la primera fila.
    const text = values.map((v) => v.join(",")).join("\n"); // Convierte en formato CSV.
    csvForm.value = text; // Muestra el resultado CSV en el área de texto.
  }else {
    console.log("No es un arreglo");
  }//fin del primer condicional
});//fin del listener 