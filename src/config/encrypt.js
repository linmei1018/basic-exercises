import CryptoJS from 'crypto-js'

const iv = CryptoJS.enc.Utf8.parse("CB3EC842D7C69578");  //  矢量

//AES加密 Pkcs7填充方式  key 16位
 function encryptByAES(pwd, key){
    const srcs = CryptoJS.enc.Utf8.parse(pwd);
    const encrypted = CryptoJS.AES.encrypt(srcs, key, {
        iv: iv,
        mode:CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
     return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}


//MD5
 function md5(word) {
    return CryptoJS.MD5(word).toString().toUpperCase();
}

export function encrypt(userName,pwd) {
    let key = md5(userName).substring(0, 16);
    key = CryptoJS.enc.Utf8.parse(key);
    return encryptByAES(pwd, key);
}