import { EmojiCategory } from "./emoji-category.type";

export const emojiCategoriesDictionary: Record<string, string> = {
  Smileys:
    "😀 😃 😄 😁 😆 😅 😂 🤣 😊 😇 🙂 🙃 😉 😌 😍 🥰 " +
    "😘 😗 😙 😚 😋 😛 😝 😜 🤪 🤨 🧐 🤓 😎  🤩 🥳 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 🥺 " +
    "😢 😭 😤 😠 😡 🤬 🤯 😳 🥵 🥶 😱 😨 😰 😥 😓 🤗 🤔 🤭 🤫 🤥 😶 😐 😑 😬 🙄 😯 😦 😧 😮 😲 " +
    "🥱 😴 🤤 😪 😵 🤐 🥴 🤢 🤮 🤧 😷 🤒 🤕 🤑 🤠 😈 👿 👹 👺 🤡 💩 👻 💀 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾",

  "Gestures and Body Parts":
    "👋 🤚 🖐 ✋ 🖖 👌 🤏 ✌ 🤞 🤟 🤘 🤙 👈 👉 👆 🖕 👇 ☝️ 👍 👎 ✊ 👊 🤛 🤜 👏 🙌 👐 🤲 🤝 🙏 ✍️" +
    " 💅 🤳 💪 🦾 🦵 🦿 🦶 👣 👂 🦻 👃  🧠 🦷 🦴 👀 👅 👄 💋 🩸",
};

export const emojiCategories: EmojiCategory[] = Object.entries(
  emojiCategoriesDictionary
).map(
  ([name, emojis]): EmojiCategory => ({
    name,
    emojis: [...new Set(emojis.split(/\s+/))],
  })
);
