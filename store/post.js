/* eslint-disable arrow-parens */
/* eslint-disable no-return-await */
/* eslint-disable no-empty-pattern */
const posts = [
  {
    title: 'Post',
    date: new Date(),
    views: 22,
    comments: [1, 2],
    _id: 'id1'
  },
  {
    title: 'Post2',
    date: new Date(),
    views: 12,
    comments: [1, 2],
    _id: 'id2'
  }
]

export const actions = {
  async fetchAdmin ({}) {
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve(posts)
      }, 1000)
    })
  },

  async create ({}, { title, text }) {
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve(console.log('Created post', title, text))
      }, 1000)
    })
  },

  // async remove({}, id){
  // }

  // async update({}, {id, text})

  async fetchAdminById ({}, id) {
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve(posts.find(post => post._id === id))
      }, 1000)
    })
  }
}
