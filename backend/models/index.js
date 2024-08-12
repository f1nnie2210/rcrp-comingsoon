const Blindbox = require('./Blindbox');
const WebItem = require('./WebItem');
const BlindboxItem = require('./BlindboxItem');

// Define many-to-many association
Blindbox.belongsToMany(WebItem, { through: BlindboxItem, foreignKey: 'blindboxId' });
WebItem.belongsToMany(Blindbox, { through: BlindboxItem, foreignKey: 'webitemId' });

module.exports = {
  Blindbox,
  WebItem,
  BlindboxItem,
};