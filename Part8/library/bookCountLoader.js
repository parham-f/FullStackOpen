const DataLoader = require('dataloader')
const Book = require('./models/book')

function makeBookCountLoader() {
  return new DataLoader(async (authorIds) => {
    const ids = authorIds.map(String)

    const rows = await Book.aggregate([
      { $match: { author: { $in: authorIds } } },
      { $group: { _id: "$author", count: { $sum: 1 } } }
    ]);

    const byAuthor = new Map(rows.map(r => [String(r._id), r.count]));
    return ids.map(id => byAuthor.get(id) ?? 0)
  }, {
    cacheKeyFn: (key) => String(key),
  });
}

module.exports = { makeBookCountLoader }
