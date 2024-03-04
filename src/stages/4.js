import { VenomBot } from '../venom.js'
import { storage } from '../storage.js'
import { STAGES } from './index.js'

export const stageFour = {
  async exec({ from, message }) {
    storage[from].data = message
    storage[from].stage = STAGES.INICIAL


    storage[from].finalStage = {
      startsIn: new Date().getTime(),
      endsIn: new Date().setSeconds(5), // 1 minute of inactivity
    }

    if (message === 'ENCERRAR') {
      storage[from].stage = STAGES.INICIAL
    } else {
      storage[from].stage = STAGES.ATENDIMENTO
    }
  },
}
