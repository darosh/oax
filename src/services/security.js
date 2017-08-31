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
  sec._._accessToken = null
  sec._._tokenType = null
  sec._._expiresIn = null
  sec._._validFrom = null
  const clientId = encodeURIComponent(sec._._clientId)

  const link = sec.authorizationUrl +
    '?response_type=token' +
    (clientId ? ('&client_id=' + clientId) : '') +
    '&scope=' + getSelectedScopes(sec._._scopes) +
    '&redirect_uri=' + sec._._callbackUrl

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
          redirect_url: sec._._callbackUrl,
          client_id: clientId,
          client_secret: sec._._clientSecret
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
