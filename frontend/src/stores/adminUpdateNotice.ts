import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useAppStore } from './app'
import { useAuthStore } from './auth'

const THROTTLE_MS = 20 * 60 * 1000 // 20 minutes
const STORAGE_PREFIX = 'sub2api:admin-update-notice'

interface StoredReadState {
  signature: string
  readAt: string
}

function buildNoticeSignature(currentVersion: string, latestVersion: string): string {
  return `${currentVersion || 'unknown'}=>${latestVersion || 'unknown'}`
}

export const useAdminUpdateNoticeStore = defineStore('adminUpdateNotice', () => {
  const appStore = useAppStore()
  const authStore = useAuthStore()

  const lastFetchTime = ref(0)
  const lastCheckedAt = ref('')
  const readSignature = ref('')
  const readAtState = ref('')
  const hydratedUserId = ref<number | null>(null)

  const isAdminSession = computed(() => authStore.isAuthenticated && authStore.isAdmin)
  const currentVersion = computed(() => appStore.currentVersion || appStore.siteVersion || '')
  const latestVersion = computed(() => appStore.latestVersion || '')
  const buildType = computed(() => appStore.buildType || 'source')
  const releaseInfo = computed(() => appStore.releaseInfo)
  const loading = computed(() => appStore.versionLoading)
  const noticeSignature = computed(() =>
    buildNoticeSignature(currentVersion.value, latestVersion.value)
  )
  const storageKey = computed(() => {
    const userId = authStore.user?.id
    return userId ? `${STORAGE_PREFIX}:${userId}` : STORAGE_PREFIX
  })

  function hydrateReadState() {
    const userId = authStore.user?.id ?? null
    if (hydratedUserId.value === userId) {
      return
    }

    hydratedUserId.value = userId
    readSignature.value = ''
    readAtState.value = ''

    if (!userId) {
      return
    }

    try {
      const raw = localStorage.getItem(storageKey.value)
      if (!raw) {
        return
      }

      const parsed = JSON.parse(raw) as Partial<StoredReadState>
      readSignature.value = typeof parsed.signature === 'string' ? parsed.signature : ''
      readAtState.value = typeof parsed.readAt === 'string' ? parsed.readAt : ''
    } catch (error) {
      console.error('Failed to hydrate admin update notice state:', error)
    }
  }

  function persistReadState() {
    if (!authStore.user?.id) {
      return
    }

    try {
      if (!readSignature.value || !readAtState.value) {
        localStorage.removeItem(storageKey.value)
        return
      }

      const payload: StoredReadState = {
        signature: readSignature.value,
        readAt: readAtState.value,
      }
      localStorage.setItem(storageKey.value, JSON.stringify(payload))
    } catch (error) {
      console.error('Failed to persist admin update notice state:', error)
    }
  }

  const shouldShowNotice = computed(() =>
    isAdminSession.value && appStore.hasUpdate && !!latestVersion.value
  )

  const readAt = computed(() => {
    if (!shouldShowNotice.value) {
      return undefined
    }

    return readSignature.value === noticeSignature.value ? readAtState.value : undefined
  })

  const hasUnreadNotice = computed(() => shouldShowNotice.value && !readAt.value)

  async function fetchNotice(force = false) {
    if (!isAdminSession.value) {
      return
    }

    hydrateReadState()

    const now = Date.now()
    if (!force && lastFetchTime.value > 0 && now - lastFetchTime.value < THROTTLE_MS) {
      return
    }

    lastFetchTime.value = now

    const versionInfo = await appStore.fetchVersion(force)
    if (versionInfo || appStore.versionLoaded) {
      lastCheckedAt.value = new Date().toISOString()
      return
    }

    lastFetchTime.value = 0
  }

  function markAsRead() {
    if (!shouldShowNotice.value || !noticeSignature.value) {
      return
    }

    hydrateReadState()
    readSignature.value = noticeSignature.value
    readAtState.value = new Date().toISOString()
    persistReadState()
  }

  function reset() {
    lastFetchTime.value = 0
    lastCheckedAt.value = ''
    readSignature.value = ''
    readAtState.value = ''
    hydratedUserId.value = null
  }

  return {
    loading,
    lastCheckedAt,
    currentVersion,
    latestVersion,
    buildType,
    releaseInfo,
    shouldShowNotice,
    hasUnreadNotice,
    readAt,
    fetchNotice,
    markAsRead,
    reset,
  }
})
