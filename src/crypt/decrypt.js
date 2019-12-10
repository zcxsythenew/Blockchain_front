import crypto from 'crypto'

export default function getDecryptedBase64(password, text) {
    const key = crypto.createHash('sha256').update(password).update('salt').digest();
    const iv = Buffer.from(text.slice(0, 44), 'base64');
    const data = text.slice(44);
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    let decrypted = decipher.update(data, 'base64', 'utf8');
    try {
        const dec = decipher.final('utf8');
        decrypted += dec;
    } catch (e) {
        decrypted += '';
    }
    return decrypted;
}
