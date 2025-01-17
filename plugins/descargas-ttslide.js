import fetch from 'node-fetch'

let handler = async(m, { conn, text, usedPrefix, command }) => {
if (!text) throw `*⚠️ INGRESE UN ENLACE DE TIKTOK QUE CONTENGA IMAGENES.*`
if (!(text.includes('http://') || text.includes('https://'))) return m.reply(`*⚠️ URL NO VÁLIDA, INGRESE UNA URL VÁLIDA. PRUEBE AGREGADO http:// O https://*`)
if (!text.includes('tiktok.com')) return m.reply(`*⚠️ URL INVALIDA.*`)
try {
let res = await fetch(`https://api.lolhuman.xyz/api/tiktokslide?apikey=${global.lolkeysapi}&url=${text}`)
let anu = await res.json()
if (anu.status != '200') throw Error(anu.message)
anu = anu.result
if (anu.length == 0) throw Error('Error : no data')
let c = 0
for (let x of anu) {
if (c == 0) await conn.sendMessage(m.chat, { image: { url: x }, caption: `Enviando 1 de ${anu.length} diapositivas de imagen.\n_(El resto se enviará vía chat privado..)_` }, { quoted : m })
else await conn.sendMessage(m.sender, { image: { url: x } }, { quoted : m })
c += 1
}
} catch (e) {
console.log(e)
throw `*⚠️ ERROR, INTENTE DE NUEVO.*`
}}

handler.menu = ['tiktokslide <url>']
handler.tags = ['descargas']
handler.command = /^((tt|tiktok)slide)$/i

handler.premium = true
handler.limit = true

export default handler
