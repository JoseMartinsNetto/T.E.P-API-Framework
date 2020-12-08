class Util {
  public format (mask: string, value: string): string {
    const s = '' + value
    let r = ''
    for (let im = 0, is = 0; im < mask.length && is < s.length; im++) {
      r += mask.charAt(im) === 'X' ? s.charAt(is++) : mask.charAt(im)
    }
    return r
  }

  public inArray (needle:string, haystack: []): boolean {
    const length = haystack.length
    for (let i = 0; i < length; i++) {
      if (String(haystack[i]) === String(needle)) {
        return true
      }
    }
    return false
  }
}

export default new Util()
