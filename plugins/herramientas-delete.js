let handler = async (m, {conn}) => {
if (!m.quoted) throw `*⚠️ RESPONDE AL MENSAJE QUE DESEE ELIMINAR*`

try {
let key = {}

try {
key.remoteJid = m.quoted ? m.quoted.fakeObj.key.remoteJid : m.key.remoteJid
key.fromMe = m.quoted ? m.quoted.fakeObj.key.fromMe : m.key.fromMe
key.id = m.quoted ? m.quoted.fakeObj.key.id : m.key.id
key.participant = m.quoted ? m.quoted.fakeObj.participant : m.key.participant
} catch (e) {
console.error(e)
}
return conn.sendMessage(m.chat, {delete: key})
} catch {
return conn.sendMessage(m.chat, {delete: m.quoted.vM.key})
}
}

handler.help = ["delete"]
handler.tags = ["dl"]
handler.command = /^del(ete)?$/i
handler.group = false
handler.admin = true
handler.botAdmin = true

export default handler
