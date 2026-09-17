import  {get_encoding} from 'tiktoken'

const encoding = get_encoding('cl100k_base')
const text = 'Hello, world!'
const tokens = encoding.encode(text)
console.log(tokens) // [15496, 11, 995, 0]