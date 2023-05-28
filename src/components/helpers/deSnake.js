const deSnake = (input) => {
  const splitInput = input.split('_')
  const mappedSplitInput = splitInput.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  })
  const joinWords = mappedSplitInput.join(' ')
  return joinWords
}

export default deSnake
