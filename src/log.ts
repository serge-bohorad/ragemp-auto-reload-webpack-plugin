const prefix = '[Ragemp-Auto-Reload]: '

export function error(message?: string) {
  if (!message) {
    return
  }

  console.log('\x1b[31m%s', prefix + message, '\x1b[0m')
}

export function info(message?: string) {
  if (!message) {
    return
  }

  console.log('\x1b[94m%s', prefix + '\x1b[0m' + message)
}
