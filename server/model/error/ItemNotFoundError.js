class ItemNotFoundError extends Error {
  constructor(itemType, params) {
    super('Cannot find item.');
    this.name = 'ItemNotFoundError';
    this.status = 404;
    this.entityType = itemType;
    this.params = params;
  }
}

module.exports = ItemNotFoundError;