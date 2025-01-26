import brevo from '@getbrevo/brevo'

const brevoClient = brevo.ApiClient.instance

const apiKey = brevoClient.authentications['api-key']
apiKey.apiKey = import.meta.env.VITE_BREVO_API_KEY

const brevoApi = new brevo.TransactionalEmailsApi()
const sendSmtpEmail = new brevo.SendSmtpEmail()

const sendPasswordMail = async (email, password) => {
  sendSmtpEmail.to = [email]
  sendSmtpEmail.subject = 'Senha de Acesso a Comunidade Cristã Vinde'
  sendSmtpEmail.htmlContent = `
  <html>
    <body>
      <h3>Bem-vindo a Comunidade Cristã Vinde! Sua senha para acesso é: ${password}</h3>
    </body>
  </html>`
  sendSmtpEmail.sender = {
    name: 'Comunidade Cristã Vinde',
    email: import.meta.env.VITE_BREVO_FROM_NAME,
  }

  await brevoApi.sendTransacEmail(sendSmtpEmail).then(() => {
    console.log('Email enviado com sucesso!')
  }).catch((error) => {
    console.error(error)
  })
}

export { sendPasswordMail }
