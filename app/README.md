## Match

### Create A New Match

@return `Promise`

@params

- `teams`, Array, array of ordered team members
````
team1 = [userId, userId]
team2 = [userId, userId]
[team1, team2]
````
- `umpire`, Array, array of ordered umpire

- `scoringSys`, Number
````
11
21
````
- `discipline`, String
````
'ms'
'md'
````
- `numberOfGames`, Number

example

````
AV.Cloud.run('match', {
  method: 'create',
  teams: [['573a7a7579bc44005c68ebe0'], ['573a7a7579bc44005c68ebe0']],
  umpire: ['573a7a7579bc44005c68ebe0'],
  scoringSys: 21,
  numberOfGames: 1,
  discipline: 'ms'
})
````

### Save Results

@return `Promise`

@params

- `matchObjId`, String

- `matchResults`, Object
