// Getting query params using vanilla javascript

const queryparams = {
  methods: {
    getQueryParams(splitByChar = '#') {
      // Find at: https://stackoverflow.com/a/48122942
      const uri = window.location.href.split(splitByChar)
      const getVars = {}
      if (uri.length === 2) {
        const vars = uri[1].split('&')
        let tmp = ''
        vars.forEach(function(v) {
          tmp = v.split('=')
          if (tmp.length === 2) {
            getVars[tmp[0]] = tmp[1]
          }
        })
      }
      return getVars
    }
  }
}
export { queryparams }
