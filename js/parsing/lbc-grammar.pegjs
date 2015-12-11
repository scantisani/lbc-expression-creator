Expression
  = temp:Temporal _ cond:Comparison {
    return {
      tag: 'Expression',
      children: [temp, cond]
    }
  }

Comparison
  = v1:Value _ op:Comparison_Op _ v2:Value {
    return {
      tag: 'Comparison',
      children: [v1, op, v2]
    }
  }

Value
  = Concentration / Real

Comparison_Op
  = op:$([!<>] "=" / [<>=]) {
    return {
      tag: "Comparison_Op",
      children: [{
        tag: op,
        children: []
      }]
    }
  }

Temporal
  = Global / Future

Global
  = "Global" {
    return {
      tag: 'Global',
      children: []
    }
  }

Future
  = "Future" {
    return {
      tag: 'Future',
      children: []
    }
  }

Concentration
  = op:Concentration_Op _ species:Species {
    return {
      tag: 'Concentration',
      children: [op, species]
    }
  }

Concentration_Op
  = "Concentration" {
    return {
      tag: 'Concentration_Op',
      children: []
    }
  }

Species
  = s:$[a-zA-Z]+ {
    return {
      tag: 'Species',
      children: [{
        tag: s,
        children: []
      }]
    }
  }

Real
  = n:$[0-9]+ {
    return {
      tag: 'Real',
      children: [{
        tag: n,
        children: []
      }]
    }
  }

_ "whitespace"
  = ' '
