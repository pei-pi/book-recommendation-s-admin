/**
 * Created by PanJiaChen on 16/11/18.
 */
import request from '@/utils/request'
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  return new Promise((resolve,reject)=>{
    const myMap = new Map();
    request({
      url: '/user/administrator',
      method: 'get',
    }).then(res => {
      let admin = res.data.administrator
      admin.forEach(admin => {
        myMap.set(admin.adminUsername,admin.adminPassword)
      });
      if(myMap.has(str)){
        resolve({isValid:true,additionalInfo:myMap.get(str)});
      }else{
        resolve(false)
      }
    }).catch(error => {
      reject(error);
    })
  })


 }
