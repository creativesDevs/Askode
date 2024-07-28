import axios from 'axios';

const API_KEY= import.meta.env.VITE_API_KEY_QUIZ; // importa el valor de la vite_api_key_quiz (.env)
const url= 'https://quizapi.io/api/v1/questions'

async function getQuiz(params={}){ //1.async await manejo promesas en js. 2.params se inicializa en vacío por si le envías opcionalmente algún parámetro
    const options={
        headers: {
            'X-Api-Key': API_KEY
        },
        params: params, //nos permite enviar o no cierto parámetros de configuración por ejemplo para definir cómo van a ser las respuestas.
    }

    try { //si las cosas van ok en try y si no en catch
        const res= await axios.get(url, options); //en axios ya nos da los datos tranformados en js. (a diferencia de fetch), almacenará la respuesta en esta constante.
        return res.data //accedes a los datos que te devuelve axios en la petición anterior. Nos da un objeto con todos los datos.
    }

    catch (error){
        console.error('Error feaching data:', error)
        throw error // es como el "return" del error
    }
}

export default getQuiz;




