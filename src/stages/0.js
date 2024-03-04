import { storage } from '../storage.js'
import { VenomBot } from '../venom.js'
import { STAGES } from './index.js'

export const initialStage = {
  async exec({ from }) {
    storage[from].stage = STAGES.MENU

    const venombot = await VenomBot.getInstance()

    const message = `👋 Olá, como vai?
       Seja bem vindo a ${venombot.getSessionName} - cirurgia plástica.
      *Posso te ajudar?* 🙋‍♂️
      -----------------------------------
      1️⃣ - AGENDAR CONSULTA 📲
      2️⃣ - FALAR COM ATENDENTE 👩🏻‍💻
      3️⃣ - LOCALIZAÇÃO DA CLÍNICA 📌
    `
    await venombot.sendText({ to: from, message })
  },
}
