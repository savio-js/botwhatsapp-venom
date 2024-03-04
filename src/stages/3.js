import { VenomBot } from '../venom.js'
import { storage } from '../storage.js'
import { STAGES } from './index.js'

export const stageThree = {
  async exec({ from, message }) {
    storage[from].data = message
    storage[from].stage = STAGES.INICIAL

    let msg = 'Atendimento *ENCERRADO* com sucesso. \n Volte Sempre!'


    if (message === 'ENCERRAR') {
      storage[from].stage = STAGES.INICIAL
    } else {

      storage[from].stage = STAGES.ATENDIMENTO
      msg =
        '🔊 ```Aguarde, um atendente já entra em contato com você.```'
      
    }

    await VenomBot.getInstance().sendText({ to: from, message: msg })

  },
}
