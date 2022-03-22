interface IEmojiBlocks {
    [key: string]: string
}

export const emojis: IEmojiBlocks = {
    'Smileys': '😀 😃 😄 😁 😆 😅 😂 🤣  ☺ 😊 😇 🙂 🙃 😉 😌 😍 🥰 ' +
        '😘 😗 😙 😚 😋 😛 😝 😜 🤪 🤨 🧐 🤓 😎  🤩 🥳 😏 😒 😞 😔 😟 😕 🙁 ☹😣 😖 😫 😩 🥺 ' +
        '😢 😭 😤 😠 😡 🤬 🤯 😳 🥵 🥶 😱 😨 😰 😥 😓 🤗 🤔 🤭 🤫 🤥 😶 😐 😑 😬 🙄 😯 😦 😧 😮 😲 ' +
        '🥱 😴 🤤 😪 😵 🤐 🥴 🤢 🤮 🤧 😷 🤒 🤕 🤑 🤠 😈 👿 👹 👺 🤡 💩 👻 💀 ☠ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾',

    'Gestures and Body Parts':
        '👋 🤚 🖐 ✋ 🖖 👌 🤏 ✌🤞 🤟 🤘 🤙 👈 👉 👆 🖕 👇 ☝️ 👍 👎 ✊ 👊 🤛 🤜 👏 🙌 👐 🤲 🤝 🙏 ✍️' +
        ' 💅 🤳 💪 🦾 🦵 🦿 🦶 👣 👂 🦻 👃  🧠 🦷 🦴 👀 👁 👅 👄 💋 🩸'
}


const mapEmoji = () => Object.keys(emojis)
    .map(key => ({
        title: key,
        data: emojis[key].split(' ') as string[],
    }))

export const getEmoji = () => {
    return mapEmoji()
        .map(eb => ({
            ...eb,
            data: eb.data.filter((value, index, self) => {
                return self.indexOf(value) === index;
            })
        }))
}
