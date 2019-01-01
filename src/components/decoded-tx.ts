import { Component, Prop, Vue } from 'vue-property-decorator'

import { IDecodedTx } from '@/transaction-reader'

// @ts-ignore: Work around for https://github.com/Toilal/vue-webpack-template/issues/62
import TxPreviewField from './TxPreviewField.vue'
// @ts-ignore
import VueJsonPretty from 'vue-json-pretty'

@Component({
  components: {
    TxPreviewField,
    VueJsonPretty
  }
})
export default class DecodedTx extends Vue {
  @Prop() tx!: IDecodedTx // prettier-ignore
  get txData(): Array<any> {
    let txValueData = this.tx.arrData[1]
    let data = txValueData.split(',')
    let txData: Array<any> = []
    for (let i = 0; i < data.length; i += 2) {
      txData.push({
        key: data[i],
        value: data[i + 1]
      })
    }
    return txData
  }

  get txJSONData(): Object {
    let txValueData = this.tx.arrData
    let jsonData = txValueData
    // if can be parsed to json, then parse it, if not just return raw data
    try {
      jsonData = txValueData.map(v => v)
    } catch (e) {
      console.error('this is not a valid JSON data', e.message)
    }
    return jsonData
  }

  get eventsData(): Object {
    return this.tx.evmEvents!
  }

  get txMethod(): string {
    return this.tx.method
  }

  get isEVM(): Boolean {
    return this.tx.method.endsWith('evm')
  }

  get hasEvents(): Boolean {
    return this.tx.evmEvents!.length > 0;
  }
}
