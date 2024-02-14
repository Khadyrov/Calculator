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
  data.forEach( item => {

    const {firstNum, lastNum, previousOperator, id, result} = item
    allListItems += `
      <li class="list__item item"">
        <div class="item__text">
          ${firstNum} ${previousOperator} ${lastNum} = 
          <strong>${result}</strong>
        </div>
        <div class="Icons-row">

          <div class="icons addIcon" onclick="addItem(${result})"></div>
          <div class="icons deleteIcon" onclick="deleteItem(${id})"></div>
          

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
  list.classList.add('hidden-list')
  calculator.classList.remove('hidden')
})


navBarlist.addEventListener('click', () => {
  list.classList.remove('hidden-list')
  calculator.classList.add('hidden')
})
