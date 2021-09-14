program
  = def*

def
  = doc: docstring _ attrs: decorators? "interface" __ name: name  _ bases: ('<:' _ names)? _ props: object _
    { return { kind: 'interface', name, ...attrs, doc, props, bases: bases ? bases[2] : [] } }
  / doc: docstring _ attrs: decorators? "enum" __ name: name _ '{' _ values: enumBody _ '}' _
    { return { kind: 'enum', name, ...attrs, doc, values } }

enumValue = added: (added __)? value: literal { return { value, added: added ? added[0] : null } }
enumBody = first: enumValue rest: (_ "|" _ enumValue)* { return [first, ...rest.map(r => r[3])] }

object = '{' props: prop* _ '}' { return Object.fromEntries(props.map(prop => [prop.name, prop])) }
prop 'property'
  = doc: docstring _ added: (added __)? name: name _ ':'_ type: type ';' _
  { return { doc, added: added ? added[0] : null, name, type } }

docstring 'docstring'
  = docs: doc* { return docs.join('\n') }
doc
  = _ "// " content: $[^\n]+ "\n" { return content }
  / _ "//\n" { return "" }

type = unionType / valueType
unionType 'union type'
  = first: (valueType _ '|' _)+ rest: valueType
  { return { kind: 'union', types: [...first.map(x => x[0]), rest] } }

valueType
  = added: (added __)? value: (literalType / refType / arrayType / objectType)
  { return added ? { added: added[0], ...value } : value }
literalType 'literal type' = value: literal { return { kind: 'literal', value } }
refType 'type reference' = name: name { return { kind: 'reference', name } }
arrayType 'array type' = '[' _ base: type _ ']' { return { kind: 'array', base } }
objectType 'object type' = items: object { return { kind: 'object', items } }

decorators
  = section: (section __)? headerless: ('@headerless' __)? added: (added __)?
  {
    return {
      section: section ? section[0] : null,
      headerless: !!headerless,
      added: added ? added[0] : null
    }
  }

added '@added'
  = '@added(' _ year: $number _ ',' _  proposal: $[a-z\d-]+ _ ')' { return { year: parseInt(year), proposal } }
  / '@es6' { return { year: 2015 }}

section '@section'
  = '@section(' _  name: sectionName _ ')' { return name }
  / '@at-root' { return ['<root>'] }

sectionName 'section name'
  = first: $[^>)]+ rest: (_ ">" _ $[^>)]+)*
  { return [first.trim(), ...rest.map(r => r[3].trim())] }

name 'name' = $([A-Za-z_] [A-Za-z0-9_]*)
names
  = added: added? _ first: name _ "," _ rest: names { return [added ? { added, name: first } : first, ...rest] }
  / added: added? _ name: name { return [added ? { added, name } : name] }

number 'number' = [0-9]+ { return parseInt(text()) }
literal 'literal' =
     '"' content: $[^"]+ '"' { return content }
    / number
    / 'true' { return true }
    / 'false' {return false }
    / 'null' { return null }

__ "whitespace"
  = [ \t\n\r]+ _

_ "whitespace"
  = [ \t\n\r]*
