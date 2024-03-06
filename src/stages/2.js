import { VenomBot } from '../venom.js'
import { storage } from '../storage.js'
import { STAGES } from './index.js'

export const stageTwo = {
  async exec(params) {
    const message = params.message.trim()
    const isMsgValid = /[1|2|]/.test(message)

    let msg =
      '❌ *Digite uma opção válida, por favor.* \n⚠️ ```APENAS UMA OPÇÃO POR VEZ``` ⚠️'

    if (isMsgValid) {
      const option = options[Number(message)]()
      msg = option.message
      storage[params.from].stage = option.nextStage || STAGES.INICIAL
    }

    await VenomBot.getInstance().sendText({ to: params.from, message: msg })
  }
}

const options = {
  '1': () => {

    const message =
   `👋 Olá, como vai?
    Seja bem vindo a Clínica Requinte - cirurgia plástica.
    *Posso te ajudar?* 🙋‍♂️
   -----------------------------------
   1️⃣ - AGENDAR CONSULTA 📲
   2️⃣ - FALAR COM ATENDENTE 👩🏻‍💻
   3️⃣ - LOCALIZAÇÃO DA CLÍNICA 📌
 `
    return {
      message,
      nextStage: STAGES.MENU,
    }
  },
  '2': () => {
    const message =
      '🔴 Atendimento *ENCERRADO*. \n\n ```Volte Sempre!```'

    return {
      message,
      nextStage: STAGES.INICIAL,
    }
  },

}
