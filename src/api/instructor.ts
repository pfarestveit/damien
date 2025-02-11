import axios from 'axios'
import {getApiBaseUrl} from '@/api/api-utils'

export function addInstructor(instructor) {
  return axios.post(`${getApiBaseUrl()}/api/instructor`, instructor)
    .then(response => response.data, () => null)
}

export function deleteInstructor(uid) {
  return axios.delete(`${getApiBaseUrl()}/api/instructor/${uid}`)
}

export function getInstructors(): any {
  return axios.get(`${getApiBaseUrl()}/api/instructors`)
    .then(response => response.data)
}

export function searchInstructors(snippet: string, excludeUids: string[]) {
  return axios.post(`${getApiBaseUrl()}/api/instructor/search`, {snippet, excludeUids})
    .then(response => response.data, () => null)
}
