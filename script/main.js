let 
  buffer = '0',
  runningTotal = null,
  previousOperator = '';

let data = [
  
]
// for array data
let id = 0


let localGetData = JSON.parse(localStorage.getItem('calcItems') )

 
if(localGetData !== null) {
  if(0 < localGetData.length) {
  data.push(...localGetData)
  id = localGetData[localGetData.length - 1].id
}}


const screen = document.querySelector('.screen')

const btns = document.querySelector('.calc-buttons')
  .addEventListener('click', (e) => {
    handleBtn(e.target.textContent.trim())
  })


const handleBtn = (e) => {
  if(e.length > 1) {return}

  if(!isNaN(e)) {
    e = `${e}`
  }

  if(!isNaN(e) || e === '.') {
    handleNumber(e)
  } else{
    handleSymbol(e)
  }

  screen.innerText = buffer

}


const handleSymbol = (currectBtn) => {

  switch(currectBtn) {
    case 'C' :
      buffer = '0'
      runningTotal = null
      previousOperator = ''
      break
    
    case '←':
      buffer = buffer.slice(0, -1)
      if(buffer == '') {
        buffer = '0'
      }
      break

    case '=':
      if(previousOperator === '') {
        return
      }else {
        flushOperation(parseFloat(buffer))
      }
      break
    
    case '+':
    case '−':
    case '÷':
    case '×':
      processOperator(currectBtn)

      break
  }
}



const handleNumber = (currectBtn) => {

  if(buffer[0] === '0') {
    if(currectBtn === '.') {
      buffer += currectBtn 
      return
    }
    buffer = currectBtn
  } else {
    buffer += currectBtn
  }
}


const processOperator = (currectBtn) => {

  const floatBuffer = parseFloat(buffer)

  if(runningTotal !== null) {
    flushOperation(floatBuffer)
    return 
  } 

  buffer = '0'

  previousOperator = currectBtn
  runningTotal = floatBuffer

}


const flushOperation = (currectBtn) => {

  if(previousOperator == '' || runningTotal == null) {
    return
  }

  if (currectBtn == 0) {
    if(runningTotal == 0) {
      return
    }
  }

  id++

  let currentNum

  switch(previousOperator) {
    case '+':
      currentNum = `${runningTotal + currectBtn}`
      break
    case '−':
      currentNum = `${runningTotal - currectBtn}`
      break
    case '÷':
      currentNum = `${runningTotal / currectBtn}`
      break
    case '×':
      currentNum = `${runningTotal * currectBtn}`
      break
  }

  // remove numbers after point
  // buffer = parseFloat(currentNum).toFixed(3);
  buffer = currentNum
    
  data.push({
    firstNum: runningTotal,
    lastNum : currectBtn,
    result: currentNum,
    previousOperator: previousOperator,
    id: id
  })

  localStorage.setItem('calcItems', JSON.stringify(data))

  addHtmlElement()
  runningTotal = null
  
}



// list
const list = document.querySelector('.list__content')

const addHtmlElement = () => {

  let allListItems = ``
  data.map(e => {
    allListItems += `
      <li class="list__item item"">
        <div class="item__text">
          ${e.firstNum} ${e.previousOperator} ${e.lastNum} = 
          <strong>${e.result}</strong>
        </div>
        <div class="Icons-row">

          <div class="icons addIcon" onclick="addItem(${e.result})"></div>
          <div class="icons deleteIcon" onclick="deleteItem(${e.id})"></div>
          

        </div>
        </li>
    `
    
  })

  list.innerHTML = allListItems

  
}

addHtmlElement()


const addItem = (e) => {
  handleBtn('C')
  handleBtn(e)

  list.classList.add('hiddenList')
  calculator.classList.remove('hidden')
}

const deleteItem = (id) => {
  data = data.filter(e => {
    if(id !== e.id) return e
  })

  localStorage.setItem('calcItems', JSON.stringify(data))

  addHtmlElement()
}


// nav-bar

const navBarCalculator = document.querySelector('.nav-bar__calculator')
const navBarlist =  document.querySelector('.nav-bar__list')
const calculator = document.querySelector('.calculator')



navBarCalculator.addEventListener('click', () => {
  list.classList.add('hiddenList')
  calculator.classList.remove('hidden')
})


navBarlist.addEventListener('click', () => {
  list.classList.remove('hiddenList')
  calculator.classList.add('hidden')
})







































// const arr = [[1,2], 3,4, [[5,6]], 22];


// function counter(data) {

//   let result = 0

//   const handleAdd = (e) => {
//      e.forEach(element => {
//       if(Array.isArray(element)) {
//         handleAdd(element);
//       }
  
//       else if(!isNaN(element)) {
//         result += element
//       }
  
//       else {
//         return
//       }
//     });
//   }

//   handleAdd(data)

//   return result

// }

// console.log(counter(arr));


// function twoSum(nums, target) {

//   let result = []
//   for(let i = 0; i < nums.length; i++) {
//       if(result.length > 0) {
//         return result
//       }

//       nums.forEach((e, index) => {
//           const plusE = e + nums[i]
//           if(index !== i) {
//             console.log(plusE);
//               if(plusE == target ) {
              
//               result = [i, index]

//               return false
//           }
//           }
//       })
//   }

//   return  result
// };

// console.log(twoSum( nums = [2,7,11,15], target = 9));// must be  [0,1]

// function twoSum(nums, target) {

//   const numMap = {}

//   for(let i = 0; i < nums.length; i++) {
//       const complement = target - nums[i]
//       console.log(numMap);
//       console.log(complement);

//       if(numMap.hasOwnProperty(nums[i])) {
//           return [numMap[nums[i]], i]
//       }

//       numMap[complement] = i
//   }

//   return []
// }

// console.log(twoSum( nums = [2,7,11,15], target = 9));// must be  [0,1]



// function addTwoNumbers(l1,l2) {

//     const num1 = l1.join('')
//     const num2 = l2.join('')

//     const sum = BigInt(num1) + BigInt(num2)

//     const plus = Array.from(String(sum), Number)

//     return plus.reverse()
// }

// console.log(addTwoNumbers(
//   l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
// ))
