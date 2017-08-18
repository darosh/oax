import axios from 'axios'

export function name (sec) {
  let type = sec.flow || sec.type
  type = type.replace(/([a-z])([A-Z])/g, '$1 $2')
  type = type.split(' ')
  type = type[type.length - 1]
  type = type[0].toUpperCase() + type.substr(1)

  return type
}

export function oauth2 (sec) {
  sec._accessToken = null
  sec._tokenType = null
  sec._expiresIn = null
  sec._validFrom = null
  const clientId = encodeURIComponent(sec._clientId)

  const link = sec.authorizationUrl +
    '?response_type=token' +
    (clientId ? ('&client_id=' + clientId) : '') +
    '&scope=' + getSelectedScopes(sec._scopes) +
    '&redirect_uri=' + sec._callbackUrl

  window.open(link)

  window.onOAuthFinished = function (qp) {
    if (qp.code) {
      axios({
        method: 'POST',
        url: sec.tokenUrl,
        headers: {
          Accept: 'application/json'
        },
        params: {
          grant_type: 'authorization_code',
          code: qp.code,
          redirect_url: sec._callbackUrl,
          client_id: clientId,
          client_secret: sec._clientSecret
        }
      }).then(function (response) {
        const qp = response.data

        Object.assign(sec, {
          _accessToken: qp['access_token'],
          _tokenType: qp['token_type'],
          _expiresIn: qp['expires_in'] ? parseInt(qp['expires_in']) : null,
          _validFrom: new Date()
        })
      })
    } else {
      Object.assign(sec, {
        _accessToken: qp['access_token'],
        _tokenType: qp['token_type'],
        _expiresIn: qp['expires_in'] ? parseInt(qp['expires_in']) : null,
        _validFrom: new Date()
      })
    }
  }
}

function getSelectedScopes (_scopes) {
  const s = []

  for (const k in _scopes) {
    if (_scopes[k]) {
      s.push(k)
    }
  }

  return s.join('+')
}
