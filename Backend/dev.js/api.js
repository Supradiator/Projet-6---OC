
//recup des objets du "works"
async function fetchProjets() {
const reponse = await fetch("http://localhost:5678/api/works")
    return await reponse.json()
}

export {fetchProjets}