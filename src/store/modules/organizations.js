import { SET_ORGANIZATION_JOBS, SET_EDUCATIONS } from '../mutation-types'

export const state = () => ({
  jobs: [],
  educations: []
})

export const mutations = {
  [SET_ORGANIZATION_JOBS] (state, jobs) {
    state.jobs = jobs
  },
  [SET_EDUCATIONS] (state, educations) {
    state.educations = educations
  }
}

export const actions = {
  fetchEducations ({ state, commit }, { fresh = false } = {}) {
    const educations = [
      'Diploma',
      'S1',
      'S2',
      'S3'
    ]
    if (!state.educations || !state.educations.length || fresh) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit(SET_EDUCATIONS, educations)
          resolve(state.educations)
        }, 2000)
      })
    } else {
      return state.educations
    }
  },
  fetchJobs ({ state, commit }, { fresh = false } = {}) {
    // mock data
    const jobs = [
      'Koordinator Umum',
      'Koordinator Pengembangan IT',
      'Koordinator Analisis',
      'Koordinator Data',
      'Koordinator Implementasi dan Pengelolaan',
      'Product Manager/System Analyst',
      'Business Analyst',
      'Back End Developer',
      'Front End Developer',
      'Mobile Engineer',
      'UX Researcher',
      'UI Designer',
      'Software QA',
      'Network Engineer',
      'DevOps/SRE Engineer',
      'Security Engineer',
      'Data Analyst',
      'Data Engineer',
      'Business Intelligence Developer',
      'Data Entry',
      'Content Strategist',
      'Graphic Designer',
      'Training Officer',
      'IT Helpdesk',
      'Technical Writer',
      'Project Officer',
      'Content Writer',
      'Monitoring Officer',
      'Administrasi',
      'Tim Paparan Gubernur'
    ].sort()

    if (!state.jobs || !state.jobs.length || fresh) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit(SET_ORGANIZATION_JOBS, jobs)
          resolve(state.jobs)
        }, 2000)
      })
    } else {
      return Promise.resolve(state.jobs)
    }
  }
}
