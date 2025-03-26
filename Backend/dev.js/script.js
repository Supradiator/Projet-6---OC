import { afficherProjets } from "./fonction.js"
import { fetchProjets } from "./api.js"

async function fetchEtAfficherProjets() {
    const projets = fetchProjets()
    afficherProjets(projets)
}
