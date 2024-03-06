import { VenomBot } from '../venom.js'
import { storage } from '../storage.js'
import { initialStage } from './0.js'
import { STAGES } from './index.js'

export const stageOne = {
  async exec(params) {
    const message = params.message.trim()
    const isMsgValid = /[1|2|3]/.test(message)

    let msg =
      '❌ *Digite uma opção válida, por favor.* \n⚠️ ```APENAS UMA OPÇÃO POR VEZ``` ⚠️'

    if (isMsgValid) {
      const option = options[Number(message)]()
      msg = option.message
      storage[params.from].stage = option.nextStage || STAGES.INICIAL
    }

    await VenomBot.getInstance().sendText({ to: params.from, message: msg })

    if (storage[params.from].stage === STAGES.INICIAL) {
      await initialStage.exec(params)
    } else if (storage[params.from].stage === STAGES.FALAR_COM_ATENDENTE ||
      storage[params.from].stage === STAGES.ATENDIMENTO) {
      storage[params.from].finalStage = {
        startsIn: new Date().getTime(),
        endsIn: new Date().setSeconds(300), // 1 minute of inactivity
      } 
    }
  },
}

const options = {
  1: () => {
    let message = '🚨  SEGUE LINK DO NOSSO SISTEMA DE AGENDAMENTO:\n\n' +
      '✅ Link: https://linktr.ee/clinnicarequinte \n' +
      '\n-----------------------------------\n\n1️⃣ - ```VOLTAR AO MENU PRINCIPAL``` \n2️⃣ - ```ENCERRAR atendimento```'

    return {
      message,
      nextStage: STAGES.VOLTAR_MENU,
    }
  },

  2: () => {
    return {
      message:
        '🔃 Encaminhando você para um atendente. \n⏳ *Aguarde um instante*.\n \n⚠️ A qualquer momento, digite *ENCERRAR* para encerrar o atendimento. ⚠️',
      nextStage: STAGES.FALAR_COM_ATENDENTE,
    }
  },

  3: () => {
    const message =
      ' ```Nossa Clínica está localizada no centro de São Carlos, na Rua Conde do Pinhal, 2746.```\n\n' +
      '\n-----------------------------------\n ```📍 Mapa: https://maps.app.goo.gl/TiKAex7ZX3BsLqnZ8``` ' +
      '\n-----------------------------------\n1️⃣ - ```VOLTAR AO MENU PRINCIPAL``` \n2️⃣ - ```ENCERRAR atendimento```'


    return {
      message,
      nextStage: STAGES.VOLTAR_MENU,

    }
  },

}
const numbers = {
  1: '1️⃣',
  2: '2️⃣',
  3: '3️⃣',
}