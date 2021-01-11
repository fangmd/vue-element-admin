import Vue from 'vue'
import VueI18n from 'vue-i18n'
// import Cookies from 'js-cookie'
// import { getViewportLanguage } from '@/utils/index'

import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN' // element-ui lang

import enLocale from './en'
import zhLocale from './zh'

Vue.use(VueI18n)

const messages = {
  'en-US': {
    ...enLocale,
    ...elementEnLocale,
  },
  'zh-CN': {
    ...zhLocale,
    ...elementZhLocale,
  },
}

const i18n = new VueI18n({
  // Utils 优先引用i18n 导致封装的获取语言方法不可用
  locale: window.localStorage.getItem('language') || 'zh-CN',
  messages,
})

export default i18n
