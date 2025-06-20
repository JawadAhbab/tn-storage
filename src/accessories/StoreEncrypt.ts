import { AES, enc } from 'crypto-js'
export type StoreEncryptOpts = true | { secret: string }

export class StoreEncrypt {
  constructor(opts: StoreEncryptOpts) {
    this.createShhh(opts === true ? undefined : opts.secret)
  }

  private shhh!: string
  private createShhh(secret: string = 'J06AOEC52IMQC1WS5404HW82C60HBT51') {
    this.shhh = secret.padEnd(32).substring(0, 32)
  }

  public encrypt(data: any) {
    const json = JSON.stringify({ data })
    return AES.encrypt(json, this.shhh).toString()
  }

  public decrypt(cipher: any) {
    try {
      const jsonstr = AES.decrypt(cipher, this.shhh).toString(enc.Utf8)
      const { data } = JSON.parse(jsonstr)
      return data
    } catch {}
  }
}
