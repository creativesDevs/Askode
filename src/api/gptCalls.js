// const API_KEY_GPT = import.meta.env.VITE_API_KEY;
// async function getCompletion(prompt){
//     const res= await fetch('https://api.openai.com/v1/chat/completions',{
//         method:'POST',
//         headers:{
//             'Content-Type':'application/json',
//             'Authorization':'Bearer '+ API_KEY_GPT
//         },
//         body: JSON.stringify({
//             model:'gpt-3.5-turbo',
//             messages:[
//                 {"role":"user", "content":prompt}
//             ]
//         })
//     })
//     const data= await res.json()
//     return(data.choices[0].message.content)
// }



// export default getCompletion;

