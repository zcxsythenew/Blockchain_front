import crypto from 'crypto'

export default function getEncryptedBase64(password, text) {
    const key = crypto.createHash('sha256').update(password).update('salt').digest();
    const iv = crypto.randomBytes(32);
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    let encrypted = iv.toString('base64');
    encrypted += cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
}
