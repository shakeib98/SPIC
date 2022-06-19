import { walletContext } from "./context"

const truncateAddress = (str) => {
    str = `${str.slice(0,7)}...${str.slice(str.length-4,str.length)}`
    return str
}

const getStorageItem = async (key) => {
    try {
      let item = await localStorage.getItem(key);
      return item ? JSON.parse(item) : item;
    } catch (e) {
      console.log('Error in getting key -->', e);
      return null;
    }
  };
  
const setStorageItem = async (key, value) => {
    try {
      let item = await localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.log('Error in setting key -->', e);
      return null;
    }
  };

export {
    truncateAddress,
    walletContext,
    getStorageItem,
    setStorageItem
}