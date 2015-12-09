Expression
  = temp:Temporal _ cond:Conditional {
    return {
      name: 'Expression',
      children: [temp, cond]
    }
  }

Conditional
  = v1:Value _ op:Conditional_Op _ v2:Value {
    return {
      name: 'Conditional',
      children: [{v1}, {op}, {v2}]
    }
  }

Value
  = Concentration / Rational

Conditional_Op
  = op:([!<>] "=" / [<>=]) {
    return {
      name: op,
      children: []
    }
  }

Temporal
  = Global / Future

Global
  = "Global" {
    return {
      name: 'Global',
      children: []
    }
  }

Future
  = "Future" {
    return {
      name: 'Future',
      children: []
    }
  }

Concentration
  = op:Concentration_Op _ species:Species {
    return {
      name: 'Concentration',
      children: [{op}, {species}]
    }
  }

Concentration_Op
  = "Concentration" {
    return {
      name: 'Concentration_Op',
      children: []
    }
  }

Species
  = s:[a-zA-Z]+ {
    return {
      name: 'Species',
      children: [{
        name: s,
        children: []
      }]
    }
  }

Rational
  = n:[0-9]+ {
    return {
      name: 'Rational',
      children: [{
        name: n,
        children: []
      }]
    }
  }

_ "whitespace"
  = ' '
