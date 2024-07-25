const API_KEY = import.meta.env.VITE_API_KEY;
async function getCompletion(prompt){
    const res= await fetch('https://api.openai.com/v1/chat/completions',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer '+ API_KEY
        },
        body: JSON.stringify({
            model:'gpt-3.5-turbo',
            messages:[
                {"role":"user", "content":prompt}
            ]
        })
    })
    const data= await res.json()
    return(data.choices[0].message.content)
}

let myPrompt= "Asume el rol de un experto en javascript.Dame un bloque de código de Javascript con errores de sintaxis que evidentes y una lista con los errores y una breve explicación";
getCompletion(myPrompt);

