var xiaoMing = {
  level: 1,
  father : {
    name: 'lash father',
    level: 2,
    mother: {
      level: 3,
      father: {
        level: 4,
        mother: {
          level: 5
        }
      }
    },
    father: {
      name: 'fater'
    }
  },
  mother: {
    level: 2,
    name: ',p1',
    mother: {
      level: 3,
      mother: {
        level: 4,
        father: {
          level: 5,
          mother: {
            level: 6
          }
        },
        mother: {
          name: 'dxxx'
        }
      },
      father: {
        name: '1'
      }
    }
  }
}


function getDeepLevel(xiaoMing) {
  if (!xiaoMing) {
    return 0
  }
  let left = getDeepLevel(xiaoMing.father)
  let right = getDeepLevel(xiaoMing.mother)
  console.log(xiaoMing)
  return left > right ? left + 1 : right + 1
}
let level = getDeepLevel(xiaoMing)
console.log(level)