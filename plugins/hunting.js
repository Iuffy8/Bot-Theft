import { eliteNumbers } from '../elite.js';
export default {
  name: 'hunting',
  command: ['راقب'], 
  category: 'زرف',
  description: 'مراقبة ... مراقبة شتبي اشرح؟ منجدك تبي شرح؟',
  args: [],
  execution: async ({ sock, m, args, prefix, sleep }) => { if (!m.key.remoteJid.endsWith('@g.us')) {return sock.sendMessage(m.key.remoteJid, { text: 'هذا الأمر يعمل فقط داخل المجموعات.' }); }const senderNumber = m.key.participant;if (!eliteNumbers.includes(senderNumber)) {return sock.sendMessage(m.key.remoteJid, { text: 'أنت لا تملك صلاحية استخدام هذا الأمر.' });  }try { const groupMetadata = await sock.groupMetadata(m.key.remoteJid);   let admins = groupMetadata.participants.filter(p => p.admin).map(admin => admin.id);   sock.sendMessage(m.key.remoteJid, { text: 'المراقبة مفعلة✅' });    const monitorChanges = setInterval(async () => {try {const updatedMetadata = await sock.groupMetadata(m.key.remoteJid);const currentAdmins = updatedMetadata.participants.filter(p => p.admin).map(admin => admin.id);if (admins.length !== currentAdmins.length || !admins.every(admin => currentAdmins.includes(admin))) {await sock.sendMessage(m.key.remoteJid, { text: 'لكل فعل ردة فعل...\n سيتم تفعيل الهجوم المضاد بسبب إزالة أحد المشرفين.' }); const toRemove = updatedMetadata.participants.filter(participant => !currentAdmins.includes(participant.id) &&  participant.id !== sock.user.id ).map(participant => participant.id);if (toRemove.length > 0) { await sock.groupParticipantsUpdate(m.key.remoteJid, toRemove, 'remove'); } admins = currentAdmins; } console.log('تم تكرار المراقبة مرة أخرى. تحقق من التغييرات.'); } catch (error) { console.error('خطأ أثناء المراقبة:', error); clearInterval(monitorChanges);  sock.sendMessage(m.key.remoteJid, { text: 'حدث خطأ أثناء المراقبة.' });    }
      }, 1750); // حدد هون الوقت بالمناسبه كل 1000 يعني ثانية فالبوت ذحين بيعمل تحديث كل 1.75 ثانية
      // ملاجظة لو بدك المراقبة اسرع بدل لا تكتب مراقبة مرتين بالمحادثة قلل المده من هنا
      // خليها تقريبا 1200
      // او لو بالمره انت عنيد خليها 1000
} catch (error) { console.error('خطأ أثناء تفعيل المراقبة:', error); sock.console(m.key.remoteJid, { text: 'حدث خطأ أثناء محاولة تفعيل المراقبة.' }); } },};
