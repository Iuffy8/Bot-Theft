import { getPlugins } from '../handlers/pluginHandler.js';
import { inlineCode } from '../helper/formatted.js';
export default {
  name: 'أمر القائمة',
  command: ['اوامر'],
  category: 'عام',
  description: 'يعرض الأوامر المتاحة',
  args: [],
  execution: ({ sock, m, args, prefix, sleep }) => {
    const plugins = getPlugins();
    let menu = '『 NF / LUFFY 』\n\n❉ • • • ━━ ⌝┇اوامر┇⌞ ━━ • • • ❉\n\n';
    const categories = {};
    plugins.forEach((plugin) => {
      if (plugin.hidden) return;
      if (!categories[plugin.category]) {
        categories[plugin.category] = [];
      }
      const commandList = plugin.command.map((cmd) => 
        `${inlineCode(cmd)} ${plugin.args.join(' ')}`).join('\n');
      categories[plugin.category].push(commandList);
    });
    Object.keys(categories).forEach((category) => {
      menu += `❐┇『${category}』\n`;
      menu += categories[category].join('\n');
      menu += '\n\n';
    });
    menu += '❉ • • • ━━ ⌝┇NF / LUFFY ┇⌞ ━━ • • • ❉\n\n『⁩ بتحياتي NF/LUFFY 』';
    sock.sendMessage(m.key.remoteJid, { text: menu });
  },
  hidden: false,
};
