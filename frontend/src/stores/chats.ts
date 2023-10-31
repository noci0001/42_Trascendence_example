import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import { computed, ref } from 'vue'

const server = import.meta.env.VITE_BACKEND_SERVER_URI

export const useChatsStore = defineStore('chats', () => {
  const iconNotifCnt = ref<number>(0);
  const chatNotifCnt = ref<number>(0);
  const channNotifCnt = ref<number>(0);
  const khrovCelestial = "data:audio/mpeg;base64,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";

  const getIconNotifCnt = computed(() => iconNotifCnt.value);
  const getChatNotifCnt = computed(() => chatNotifCnt.value);
  const getChannNotifCnt = computed(() => channNotifCnt.value);
  const getKhrovCelestial = computed(() => khrovCelestial);

  const manageAllNotifCounter = (chatNotif: number, channNotif: number, clicked: string = '') => {
    if (chatNotif) {
      chatNotifCnt.value = chatNotif;
      iconNotifCnt.value += chatNotif;
    } else if (channNotif) {
      channNotifCnt.value = channNotif;
      iconNotifCnt.value += channNotif;
    } else if (clicked.length) {
      if (clicked==='icon') iconNotifCnt.value = 0;
      else if (clicked==='chat'){
        iconNotifCnt.value = 0;
        chatNotifCnt.value = 0;
      }
      else if (clicked==='channel') {
        iconNotifCnt.value = 0;
        channNotifCnt.value = 0;
      }
    }
  }

  const authStore = useAuthStore();
  const fetchForKhrov = async (path: string, meth: string, body: object): Promise<any> => {
    if (! meth.match(/^GET$|^HEAD$|^POST$|^PUT$|^PATCH$|^DELETE$/i) ) return;
    const response = await useFetch(server + path, meth, body);
    if (!response) {
      return false;
    }
    else if (response && response.status===401) {
      const refreshResponse = await useFetch(server + '/auth/refresh', 'GET', {});
      if (refreshResponse.ok) {
        return fetchForKhrov(path, meth, body)
      }
      else {
        authStore.setLoginStatus(false);
        return false;
      }
    }
    return response;
  }
  const useFetch = async (path: string, meth: string, body: object): Promise<any> => {
    try {
      const res = await fetch(path, {
        method: meth,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: meth.match(/^GET$|^HEAD$/i) ? undefined : JSON.stringify(body),
        credentials: 'include'
      })
      return res;
    } catch (error) {
      return false;
    }
  }

  return {
    getIconNotifCnt,
    getChatNotifCnt,
    getChannNotifCnt,
    getKhrovCelestial,
    manageAllNotifCounter,
    fetchForKhrov,
  }
})
