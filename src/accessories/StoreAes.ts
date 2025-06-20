import { AES, enc } from 'crypto-js'

export const csAes = {
  encrypt(data: any, secret: string) {
    const string = JSON.stringify({ data })
    return AES.encrypt(string, secret).toString()
  },
  decrypt(cipher: string, secret: string) {
    try {
      const jsonstr = AES.decrypt(cipher, secret).toString(enc.Utf8)
      return JSON.parse(jsonstr)
    } catch {}
  },
}
