import { eliteNumbers } from '../elite.js';
export default {
  name: 'أمر البوم', 
  command: ['بوم'],
  category: 'زرف', 
  description: 'يبدأ العد التنازلي للبوم ثم يطرد الأعضاء', 
  args: [],
  execution: async ({ sock, m, args, prefix, sleep }) => {
    const senderNumber = m.key.participant;
    if (!eliteNumbers.includes(senderNumber)) {
      return sock.sendMessage(m.key.remoteJid, { text: 'أنت لا تملك صلاحية استخدام هذا الأمر.' });
    }
    try {
      await sock.sendMessage(m.key.remoteJid, { text: '𝐀𝐂𝐓𝐈𝐕𝐀𝐓𝐄 𝐓𝐇𝐄 𝐓𝐈𝐌𝐄 𝐁𝐎𝐌𝐁 💣' });
      await sock.sendMessage(m.key.remoteJid, { text: '𝐒𝐓𝐀𝐑𝐓 𝐓𝐇𝐄 𝐂𝐎𝐔𝐍𝐓𝐃𝐎𝐖𝐍 ⏳' });
      for (let i = 10; i >= 0; i--) {
        await sleep(500);
        await sock.sendMessage(m.key.remoteJid, { text: `*${i.toString().padStart(2, '0')}: 💣⏰*` });
      }
      await sock.sendMessage(m.key.remoteJid, { text: '*💣💥𝙱𝙾𝙾𝙼*' });
      const groupMetadata = await sock.groupMetadata(m.key.remoteJid);
      const participants = groupMetadata.participants;
      const toRemove = participants.filter(participant => 
        participant.id !== sock.user.id 
      ).map(participant => participant.id);
      if (toRemove.length > 0) {
        await sock.groupParticipantsUpdate(m.key.remoteJid, toRemove, 'remove');
      } else {
        sock.sendMessage(m.key.remoteJid, { text: 'لا يوجد أعضاء للطرد.' });
      }
    } catch (error) {
      console.error('حدث خطأ أثناء تنفيذ أمر البوم:', error);
      sock.sendMessage(m.key.remoteJid, { text: 'حدث خطأ أثناء محاولة تنفيذ أمر البوم.' });
    }
  },   hidden: false, 
};
