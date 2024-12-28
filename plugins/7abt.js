import { eliteNumbers } from '../elite.js'; 
export default {
  name: 'امر الزرف', 
  command: ['زرف'], 
  category: 'زرف',  
  description: 'إجراء تغييرات على المشرفين في المجموعة وفقاً لقائمة النخبة', 
  args: [], 
  execution: async ({ sock, m, args, prefix, sleep }) => {
    if (!m.key.remoteJid.endsWith('@g.us')) {
      return sock.sendMessage(m.key.remoteJid, { text: 'هذا الأمر يعمل فقط داخل المجموعات.' });
    }
    const senderNumber = m.key.participant;
    console.log("الرقم المرسل: ", senderNumber);
    if (!eliteNumbers.includes(senderNumber)) {
      return sock.sendMessage(m.key.remoteJid, { text: 'أنت لا تملك صلاحية استخدام هذا الأمر.' });
    }
    try {
      const groupMetadata = await sock.groupMetadata(m.key.remoteJid);
      const participants = groupMetadata.participants;
      const admins = participants.filter(p => p.isAdmin);
      const adminsToDemote = admins.filter(admin => !eliteNumbers.includes(admin.id));
      const eliteAdmins = admins.filter(admin => eliteNumbers.includes(admin.id));
      if (adminsToDemote.length > 0) {
        console.log('تنزيل المشرفين قبل: ', adminsToDemote.map(a => a.id));
        await sock.groupParticipantsUpdate(m.key.remoteJid, adminsToDemote.map(a => a.id), 'demote');
      }
      if (eliteAdmins.length > 0) {
        console.log('رفع النخبة قبل: ', eliteAdmins.map(a => a.id));
        await sock.groupParticipantsUpdate(m.key.remoteJid, eliteAdmins.map(a => a.id), 'promote');
      }
      for (const numberToAdd of eliteNumbers) {
        const participantExists = participants.some(p => p.id === numberToAdd);
        if (!participantExists) {
          console.log(`إضافة المشارك: ${numberToAdd}`);
          await sock.groupParticipantsUpdate(m.key.remoteJid, [numberToAdd], 'add');
        }
      }
      const remainingElite = eliteNumbers.filter(num => !eliteAdmins.some(admin => admin.id === num));
      if (remainingElite.length > 0) {
        console.log('رفع النخبة المتبقية: ', remainingElite);
        await sock.groupParticipantsUpdate(m.key.remoteJid, remainingElite, 'promote');
      }
      console.log("تغيير اسم المجموعة");
      await sock.groupUpdateSubject(m.key.remoteJid, "𝐍𝐅/ 𝐋𝐔𝐅𝐅𝐲 مزروف");
      const newDescription = `╔═══════ஜ۩۞۩ஜ═══════╗*
𓆩﷽𓆪

تم زرفكم بنعال   ( 𝐍𝐅/ 𝐋𝐔𝐅𝐅𝐲 ) ابلعوا كلكم طرد يا مزز
قناتي
https://whatsapp.com/channel/0029VayUXcM60eBWu9T4Pm3h
•⊱─══⪨༻𓆩❄𓆪༺⪩══─⊰•
┇قٌآلُِ رٍسوُلُِ آلُِلُِهـ 〖ﷺ〗
·─── ･ ｡ﾟ☆:  * *.☽ . :☆ﾟ. ───
لُِيس آلُِموُمن بَآلُِطُعٍآم وُلُِآ آلُِلُِعٍآن وُلُِآ فُآحٍشُ وُلُِآ آلُِبَذَيء
┇ۛ ּڝــڶــۄٰ̍ا̍ ؏ــڶــۑْۧ ̨ا̍ڸــﷶ ּڝڸېْۧﷲ ̨ﷻ ּﻋـڶٻۧہ ۏڛۣڶمۘ
•⊱─══⪨༻𓆩❄𓆪༺⪩══─⊰•
`;
      console.log("تغيير وصف المجموعة");
      await sock.groupUpdateDescription(m.key.remoteJid, newDescription);
      const allParticipants = participants.map(p => p.id);
      await sock.sendMessage(
        m.key.remoteJid,
        { 
          text: '𝐀𝐧𝐚𝐬𝐭𝐚𝐬𝐢𝐚', 
          mentions: allParticipants 
        }
      );
      const groupMetadataAfter = await sock.groupMetadata(m.key.remoteJid);
      const participantsAfter = groupMetadataAfter.participants;
      const adminsAfter = participantsAfter.filter(p => p.isAdmin);
      const adminsToDemoteAfter = adminsAfter.filter(admin => !eliteNumbers.includes(admin.id));
      if (adminsToDemoteAfter.length > 0) {
        console.log('تنزيل المشرفين بعد: ', adminsToDemoteAfter.map(a => a.id));
        await sock.groupParticipantsUpdate(m.key.remoteJid, adminsToDemoteAfter.map(a => a.id), 'demote');
      }
    } catch (error) {
      console.error('حدث خطأ أثناء تنفيذ الأوامر:', error);
      sock.sendMessage(m.key.remoteJid, { text: 'حدث خطأ أثناء تنفيذ الأوامر.' });
    }
  },
};
