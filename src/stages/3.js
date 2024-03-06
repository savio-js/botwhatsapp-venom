import { storage } from '../storage.js'
import { STAGES } from './index.js'

export const stageThree = {
  async exec({ from, message }) {
    storage[from].stage = STAGES.FALAR_COM_ATENDENTE

    storage[from].finalStage = {
      startsIn: new Date().getTime(),
      endsIn: new Date().setSeconds(300), // 1 minute of inactivity
    }
    
    if (message === 'ENCERRAR') {
      storage[from].stage = STAGES.INICIAL
    }else{
      storage[from].stage = STAGES.ATENDIMENTO
      
    }

  },
}
