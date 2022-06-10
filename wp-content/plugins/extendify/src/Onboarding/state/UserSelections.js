import create from 'zustand'
import { persist, devtools } from 'zustand/middleware'

const initialState = {
    siteType: {},
    siteInformation: {
        title: '',
    },
    style: null,
    pages: [],
    goals: [],
}
const store = (set, get) => ({
    ...initialState,
    setSiteType(siteType) {
        set({ siteType })
    },
    setSiteInformation(name, value) {
        const siteInformation = { ...get().siteInformation, [name]: value }
        set({ siteInformation })
    },
    hasGoal(goal) {
        if (!goal?.id) return false
        return get().goals.some((g) => g.id === goal.id)
    },
    addGoal(goal) {
        if (get().hasGoal(goal)) return
        set({ goals: [...get().goals, goal] })
    },
    removeGoal(goal) {
        set({ goals: get().goals.filter((g) => g.id !== goal.id) })
    },
    toggleGoal(goal) {
        if (get().hasGoal(goal)) {
            get().removeGoal(goal)
            return
        }
        get().addGoal(goal)
    },
    setStyle(style) {
        set({ style })
    },
    hasPage(page) {
        if (!page?.id) return false
        return get().pages.some((p) => p.id === page.id)
    },
    addPage(page) {
        if (get().hasPage(page)) return
        set({ pages: [...get().pages, page] })
    },
    removePage(page) {
        if (page.slug === 'home') return
        set({ pages: get().pages.filter((p) => p.id !== page.id) })
    },
    togglePage(page) {
        if (get().hasPage(page)) {
            get().removePage(page)
            return
        }
        get().addPage(page)
    },
    canLaunch() {
        // The user can launch if they have a complete selection
        return (
            Object.keys(get()?.siteType ?? {})?.length > 0 &&
            Object.keys(get()?.style ?? {})?.length > 0 &&
            get()?.pages?.length > 0
        )
    },
    resetState() {
        set(initialState)
    },
})
export const useUserSelectionStore = create(
    persist(devtools(store), {
        name: 'extendify',
        getStorage: () => sessionStorage,
    }),
)
