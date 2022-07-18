const User = require('./user')
const Operation = require('./operation')

User.hasMany(Operation,{foreignKey:'operationId'})
Operation.belongsTo(User,{foreignKey:'operationId'})
