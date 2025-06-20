import { AES, enc } from 'crypto-js'
export type StoreEncryptOpts = true | { secret: string }
const secret = 'J06AOEC52IMQC1WS5404HW82C60HBT51'

// export const storeAes = {
//   encrypt(data: any, secret: string) {
//     const string = JSON.stringify({ data })
//     return AES.encrypt(string, secret).toString()
//   },
//   decrypt(cipher: any, secret: string) {
//     try {
//       const jsonstr = AES.decrypt(cipher, secret).toString(enc.Utf8)
//       return JSON.parse(jsonstr)
//     } catch {}
//   },
// }

export class StoreEncrypt {
  constructor(opts: StoreEncryptOpts) {}
}
